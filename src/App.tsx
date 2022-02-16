import * as React from 'react'
import styled from 'styled-components'
import Location from './Location'

const StyledAppRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
`

const StyledLocationForm = styled.div`
    flex-grow: 1;
`

const StyledLocations = styled.div`
    flex-grow: 1;
    margin: 10px;
`

const StyledHeadingRow = styled.div`
    display: flex;
    font-weight: 700;
`

const StyledLocationRow = styled.div`
    display: flex;
`
const StyledCell = styled.span`
    width: 125px;
    border: 0.5px solid black;
    padding: 3px;
`

interface Location {
    id: number
    lat: string
    long: string
    sunrise: string
    sunset: string
}

interface AppState {
    locations: Location[]
    shouldTimesShow: boolean
}

const MAX_LOCATIONS = 5
class App extends React.Component<null, AppState> {
    state = {
        locations: [],
        shouldTimesShow: false,
    }

    addLocation = (newLat: string, newLong: string) => {
        const queryStr = `https://api.sunrise-sunset.org/json?lat=${newLat}&lng=${newLong}`
        fetch(queryStr)
            .then((res) => res.json())
            .then((json) => {
                const newLocation: Location = {
                    id: this.state.locations.length,
                    lat: newLat,
                    long: newLong,
                    sunrise: (json.status.toUpperCase() === 'OK' && json.results.sunrise) || 'unknown',
                    sunset: (json.status.toUpperCase() === 'OK' && json.results.sunset) || 'unknown',
                }
                this.setState((state) => {
                    const updatedLocations = state.locations.concat(newLocation)
                    return {
                        locations: updatedLocations,
                    }
                })
            })
            .catch((err) => console.log('Oh no! There was an error:', err))
    }

    handleGetTimes = () => {
        this.setState({ shouldTimesShow: true })
    }

    render() {
        return (
            <>
                <h1>Sunrise and Sunset Finder</h1>
                <StyledAppRow>
                    <StyledLocationForm>
                        <Location
                            addLocation={this.addLocation}
                            instance={this.state.locations.length}
                            max={MAX_LOCATIONS}
                            onGetTimesClick={this.handleGetTimes}
                        />
                    </StyledLocationForm>
                    <StyledLocations>
                        <StyledHeadingRow>
                            <StyledCell>Longitude</StyledCell>
                            <StyledCell>Latitude</StyledCell>
                            <StyledCell>Sunrise (utc)</StyledCell>
                            <StyledCell>Sunset (utc)</StyledCell>
                        </StyledHeadingRow>
                        {this.state.locations.map((location: Location) => {
                            return (
                                <StyledLocationRow key={`${location.long}.${location.lat}`}>
                                    <StyledCell>{location.long}</StyledCell>
                                    <StyledCell>{location.lat}</StyledCell>
                                    <StyledCell>{this.state.shouldTimesShow ? location.sunrise : '--'}</StyledCell>
                                    <StyledCell>{this.state.shouldTimesShow ? location.sunset : '--'}</StyledCell>
                                </StyledLocationRow>
                            )
                        })}
                    </StyledLocations>
                </StyledAppRow>
            </>
        )
    }
}

export default App
