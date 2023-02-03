import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function QuestMapLocationScreen({ route, navigation }) {
    const { category } = route.params;

    return ( 
        <View style={styles.container}>
            <MapView 
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            style={styles.map} 
            initialRegion={{ latitude: category.pokestops[0].latitude, longitude: category.pokestops[0].longitude, latitudeDelta: 0.02, longitudeDelta: 0.02,}}>
                {category.pokestops.map((pokestop, index) => (
                    <Marker
                        key={index}
                        title="An image?"
                        description="Marker With Pokestop Name"
                        coordinate={{ latitude: pokestop.latitude, longitude: pokestop.longitude }}
                        image={require('../assets/map_marker.png')}
                    >
                        <Callout tooltip>
                            <View style={styles.bubble}>
                                {/* <Image style={styles.image} source={{ uri: pokestop.url }} /> */}
                                <Text style={styles.name}>{pokestop.name}</Text>
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    name: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 2,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
