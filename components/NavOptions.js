import { useNavigation } from '@react-navigation/native'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { GETRIDE_RIDE, GETRIDE_EAT } from '@env';

const data = [
    {
        id: '123',
        title: 'get a ride',
        image: GETRIDE_RIDE,
        screen: 'MapScreen',
    },
    {
        id: '456',
        title: 'Order a food',
        image: GETRIDE_EAT,
        screen: 'EatsScreen',
    },
]

const NavOptions = ({ origin }) => {
    const navigation = useNavigation()
    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            horizontal={true}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity
                        disabled={origin.description ? false : true}
                        onPress={() => {
                            navigation.navigate('MapScreen')
                        }}
                        style={{
                            padding: 5,
                            paddingBottom: 8,
                            backgroundColor: 'rgba(0,0,0,.1)',
                            margin: 5,
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    height: 120,
                                    width: 120,
                                }}
                                resizeMode="contain"
                                source={{
                                    uri: item.image,
                                }}
                            ></Image>
                            <Text style={{ marginTop: 5, fontSize: 16, fontWeight: '900' }}>
                                {item.title}
                            </Text>
                            <Icon
                                style={{
                                    width: 40,
                                    marginTop: 12,
                                }}
                                name="chevron-forward-circle"
                                type="ionicon"
                                size={40}
                            />
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const mapStateToProps = props => {
    return {
        origin: props.origin,
    }
}

export default connect(mapStateToProps)(NavOptions)

const styles = StyleSheet.create({})
