import { StyleSheet, Text, View } from 'react-native'
import SearchPlace from './SearchPlace'

const NavigateCard = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text style={{ paddingVertical: 14, textAlign: 'center', fontSize: 20 }}>
                Good morning Rahul Dotel
            </Text>
            <View style={{ flex: 1 }}>
                <SearchPlace />
            </View>
        </View>
    )
}

export default NavigateCard

const styles = StyleSheet.create({})
