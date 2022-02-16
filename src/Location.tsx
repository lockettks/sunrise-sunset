import * as React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const StyledLabel = styled.label`
    margin: 5px;
`

const StyledInput = styled.input`
    width: 100px;
`

const StyledRowWrapper = styled.div`
    display: flex;
`

const StyledFieldWrapper = styled.span`
    margin: 10px;
`

const StyledButton = styled.button`
    width: 130px;
    margin: 10px;
`

interface Props {
    addLocation: (newLat: string, newLong: string) => void
    instance: number
    max: number
    onGetTimesClick: () => void
}

const Location: React.FunctionComponent<Props> = ({ addLocation, instance, max, onGetTimesClick }) => {
    const [lat, setLat] = useState<string>('')
    const [long, setLong] = useState<string>('')

    const handleClick = () => {
        if (lat && long) {
            addLocation(lat, long)
        }
        setLat('')
        setLong('')
    }

    const handleLatChange = (event: React.FormEvent<HTMLInputElement>) => {
        setLat(event.currentTarget.value)
    }

    const handleLongChange = (event: React.FormEvent<HTMLInputElement>) => {
        setLong(event.currentTarget.value)
    }

    const isNextEnabled = () => lat && long && instance < max
    const isGetTimesEnabled = () => instance === max

    const getAddButtonText = () => (instance < max ? `${instance + 1} of ${max}` : `(max reached)`)

    return (
        <StyledRowWrapper>
            <StyledFieldWrapper>
                <StyledLabel htmlFor={'lat'}>Latitude</StyledLabel>
                <StyledInput id={'lat'} placeholder={'Ex: 38.8951'} value={lat} onInput={handleLatChange} />
            </StyledFieldWrapper>
            <StyledFieldWrapper>
                <StyledLabel htmlFor={'long'}>Longitude</StyledLabel>
                <StyledInput id={'long'} placeholder={'Ex: -77.0364'} value={long} onInput={handleLongChange} />
            </StyledFieldWrapper>
            <StyledButton disabled={!isNextEnabled()} onClick={handleClick}>
                Add {getAddButtonText()}
            </StyledButton>
            <StyledButton disabled={!isGetTimesEnabled} onClick={onGetTimesClick}>
                Get times
            </StyledButton>
        </StyledRowWrapper>
    )
}

export default Location
