import { StyleSheet, View, Image } from 'react-native'
import NavOptions from '../components/NavOptions'
import SearchPlace from '../components/SearchPlace'

const HomeScreen = () => {
    return (
        <View style={styles.safeArea}>
            <View style={styles.headerDiv}>
                <Image
                    style={{
                        height: 100,
                        width: 100
                    }}
                    resizeMode='contain'
                    source={{
                        uri: 'https://links.papareact.com/gzs'
                    }}
                >

                </Image>
                <SearchPlace />
                <NavOptions />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    headerDiv: {
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    safeArea: {
        paddingTop: 20,
        height: '100%'
    }
})
