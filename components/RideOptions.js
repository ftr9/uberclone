import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { bike, car, taxi } from '../Images'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { SET_TRAVELTIME_INFORMATION } from '../slices/actions'

const options = [
    {
        id: '123',
        imageUri: bike,
        multiplier: 1,
        name: 'Bike',
        fare: 50,
    },
    {
        id: '456',
        imageUri: taxi,
        multiplier: 1.5,
        name: 'Taxi',
        fare: 100,
    },
    {
        id: '789',
        imageUri: car,
        multiplier: 2,
        name: 'Car',
        fare: 150,
    },
]

const RideOptions = ({ SET_TRAVELTIME_INFORMATION, rideInfo }) => {
    const [Current, setCurrent] = useState({})
    const navigation = useNavigation()

    const distanceCalculation = rideInfo.distance
        ? rideInfo.distance?.text
        : '...'
    const timeCalculation = rideInfo.duration ? rideInfo.duration?.text : '...'

    const Returnprice = fare => {
        const pricePerKm = rideInfo.distance?.text
        const num = fare + pricePerKm ? parseInt(pricePerKm) * 15 : 1
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(1) + 'M' // convert to M for number from > 1 million
        } else if (num < 900) {
            return num + fare // if value < 1000, nothing to do
        }
    }

    const goBack_To_Search = () => {
        navigation.goBack()
    }

    ////use Effect first time only
    useEffect(() => {
        SET_TRAVELTIME_INFORMATION()
    }, [])

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'flex-start',
                paddingHorizontal: 10,
                backgroundColor: 'white',
            }}
        >
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                }}
            >
                <TouchableOpacity onPress={goBack_To_Search}>
                    <Icon
                        name="chevron-back-circle"
                        type="ionicon"
                        color="black"
                        size={50}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        marginRight: 40,
                        fontSize: 16,
                    }}
                >
                    Select a ride - {distanceCalculation}
                </Text>
            </View>

            <FlatList
                style={{
                    width: '100%',
                }}
                data={options}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setCurrent(item)
                        }}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                            borderColor: 'rgba(0,0,0,0.1)',
                            borderWidth: item.name === Current.name ? 0.8 : 0,
                        }}
                    >
                        <Image
                            style={{ height: 70, width: 70 }}
                            resizeMode="contain"
                            source={item.imageUri}
                        ></Image>
                        <View>
                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                            <Text style={{ fontSize: 14 }}>{timeCalculation}</Text>
                        </View>
                        <Text style={{ fontSize: 20, fontWeight: '900' }}>
                            rs.
                            {Returnprice(item.fare)}
                        </Text>
                    </TouchableOpacity>
                )}
            ></FlatList>
            <TouchableOpacity

                onPress={() => {
                    alert(`${Current.name} is on the way`);
                    ////go back to Home screen
                    navigation.getParent().goBack();
                }}
                disabled={Current.name ? false : true}
                style={{
                    borderRadius: 50,
                    backgroundColor: 'black',
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 12,
                }}
            >
                <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>
                    Choose {Current.name ? Current.name : 'One'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        rideInfo: state.travelTimeInformation,
    }
}

export default connect(mapStateToProps, {
    SET_TRAVELTIME_INFORMATION,
})(RideOptions)

const styles = StyleSheet.create({})
