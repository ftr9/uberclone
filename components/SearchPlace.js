import {
    FlatList,
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import { useState } from 'react'
import { connect } from 'react-redux'
import { SET_ORIGIN, SET_DESTINATION } from '../slices/actions'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { MAPBOX_ACCESSTOKEN } from '@env';

const SearchPlace = ({ SET_ORIGIN, SET_DESTINATION }) => {
    const currentScreen = useNavigation().getState().routes[0].name
    const navigation = useNavigation()

    const inputPlaceholder = () => {
        if (currentScreen === 'HomeScreen') {
            return 'Search any place'
        }
        if (currentScreen === 'NavigateCard') {
            return 'Where to go ?'
        }
    }

    const [places, setPlaces] = useState([])

    const on_FetchedPlace_Click_HomeScreen = item => {
        SET_ORIGIN({
            location: item.center,
            description: item.placeName,
        })
    }

    const on_FetchedPlace_Click_MapScreen = item => {
        SET_DESTINATION({
            location: item.center,
            description: item.placeName,
        })
        //after setting final destination go to pick a ride page
        navigation.navigate('RideOptions')
    }

    const onValueChange = async value => {
        try {
            const places = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?limit=5&access_token=${MAPBOX_ACCESSTOKEN}`
            )
            const searchedPlaces = places.data.features.map(el => {
                let place = {}
                place['text'] = el.text
                place['placeName'] = el.place_name
                place['center'] = el.center
                return place
            })

            setPlaces(searchedPlaces)
        } catch (err) {
            setPlaces([])
        }
    }

    return (
        <View style={{ paddingHorizontal: 5 }}>
            <TextInput
                onChangeText={onValueChange}
                style={{
                    marginVertical: 5,
                    borderColor: 'rgba(0,0,0,0.2)',
                    height: 40,
                    borderWidth: 0.5,
                    paddingHorizontal: 10,
                    borderRadius: 2,
                }}
                placeholder={inputPlaceholder()}
            />

            <FlatList
                style={{ maxHeight: 250 }}
                data={places}
                keyExtractor={item => item.placeName}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                switch (currentScreen) {
                                    case 'HomeScreen':
                                        on_FetchedPlace_Click_HomeScreen(item)
                                        break
                                    case 'NavigateCard':
                                        on_FetchedPlace_Click_MapScreen(item)
                                        break
                                    default:
                                        break
                                }
                            }}
                        >
                            <View
                                style={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    marginBottom: 5,
                                    backgroundColor: 'rgba(0,0,0,0.03)',
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>{item.text}</Text>
                                <Text>{item.placeName}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            ></FlatList>
        </View>
    )
}

export default connect(null, {
    SET_ORIGIN,
    SET_DESTINATION,
})(SearchPlace)

const styles = StyleSheet.create({})
