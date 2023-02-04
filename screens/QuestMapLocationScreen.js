import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import * as Location from 'expo-location';

export default function QuestMapLocationScreen({ route, navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState({ mapRegion: null });
    const { category } = route.params;

    const mapRef = React.createRef();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        //setRegion({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
        //changeRegion(location.coords.latitude, location.coords.longitude);
        })();
    }, []);

    const changeRegion = async (targetLatitude, targetLongitude) => {
        mapRef.current.animateToRegion({
            latitude: targetLatitude,
            longitude: targetLongitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        })
    } 

    return ( 
        <View style={styles.container}>
            <MapView 
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            style={styles.map} 
            region={region.mapRegion}
            initialRegion={{ latitude: category.pokestops[0].latitude, longitude: category.pokestops[0].longitude, latitudeDelta: 0.02, longitudeDelta: 0.02,}}
            >
                {category.pokestops.map((pokestop, index) => (
                    <Marker
                        key={index}
                        title="An image?"
                        description="Marker With Pokestop Name"
                        coordinate={{ latitude: pokestop.latitude, longitude: pokestop.longitude }}
                        showsUserLocation={true}
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
