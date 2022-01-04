import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import { useRef, useEffect } from 'react'

const MapJ = ({ origin, destination }) => {
    const mapViewRef = useRef(null)
    useEffect(() => {
        if (!origin.location && !destination.location) {
            return
        }

        //fit to markers location
        mapViewRef.current.fitToSuppliedMarkers(['initial', 'final'], {
            edgePadding: { top: 10, right: 40, bottom: 10, left: 40 },
        })
    }, [origin, destination])

    return (
        <MapView
            ref={mapViewRef}
            style={{ flex: 1 }}
            mapType="mutedStandard"
            userInterfaceStyle="dark"
            initialRegion={{
                latitude: origin.location[1],
                longitude: origin.location[0],
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location[1],
                        longitude: origin.location[0],
                    }}
                    title="Initial Point"
                    description={origin.description}
                    identifier="initial"
                ></Marker>
            )}
            {destination.location && (
                <Marker
                    title="final point"
                    description={destination.description}
                    coordinate={{
                        latitude: destination.location[1],
                        longitude: destination.location[0],
                    }}
                    identifier="final"
                    pinColor="black"
                ></Marker>
            )}
        </MapView>
    )
}

const mapStateToProps = props => {
    return {
        origin: props.origin,
        destination: props.destination,
    }
}

export default connect(mapStateToProps)(MapJ)

const styles = StyleSheet.create({})
