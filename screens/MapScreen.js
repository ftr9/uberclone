import { StyleSheet, View, TouchableOpacity } from 'react-native'
import MapJ from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import { createStackNavigator } from '@react-navigation/stack'
import RideOptions from '../components/RideOptions';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();


const MapScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{ height: '100%', paddingTop: 30 }}>
            <View style={{ position: 'absolute', top: 50, left: 20, zIndex: 100 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Icon name="list" size={35} />
                </TouchableOpacity>
            </View>
            <MapJ />

            <View style={{ flex: 1 }}>
                <Stack.Navigator >
                    <Stack.Screen name='NavigateCard' component={NavigateCard} options={{
                        headerShown: false,
                    }} ></Stack.Screen>
                    <Stack.Screen name='RideOptions' component={RideOptions} options={{
                        headerShown: false
                    }} ></Stack.Screen>
                </Stack.Navigator>
            </View>
        </View>
    )
}



export default MapScreen;

const styles = StyleSheet.create({})
