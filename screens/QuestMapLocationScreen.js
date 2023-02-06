import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import pokestopImages from '../library/pokestopImages';

export default function QuestMapLocationScreen({ route, navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState({ mapRegion: null });
    const { category } = route.params;
    const mapRef = React.createRef();
    const listRef = React.useRef(null);

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
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        })
    } 

    const handleMarkerPress = (index) => {
        // set the new region based on the selected pokestop
        const selectedPokestop = category.pokestops[index];
        changeRegion(selectedPokestop.latitude, selectedPokestop.longitude);
        
        // scroll the FlatList to the selected item
        listRef.current.scrollToIndex({ index });
    }

    return ( 
        <View style={styles.container}>
            <MapView 
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            style={styles.map} 
            region={region.mapRegion}
            initialRegion={{ latitude: category.pokestops[0].latitude, longitude: category.pokestops[0].longitude, latitudeDelta: 0.01, longitudeDelta: 0.01,}}
            >
                {category.pokestops.map((pokestop, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: pokestop.latitude, longitude: pokestop.longitude }}
                        onPress={() => handleMarkerPress(index)}
                        showsUserLocation={true}
                    />
                ))}
            </MapView>

            <FlatList
            ref={listRef}
            data={category.pokestops}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            style={{ position: 'absolute', bottom: 4 }}
            renderItem={({ item, index }) => {
                return (
                <View style={styles.carouselItemContainer} key={index}>
                    <Image style={styles.image} source={pokestopImages(item.pokestop_id.replace(/\./g, ""))} />
                    <Text style={styles.carouselText}>{item.name}</Text>
                </View>
                )
            }}
            onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                const item = category.pokestops[index];
                if (item) {
                    changeRegion(item.latitude, item.longitude);
                }
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
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
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        opacity: 0.7,
    },
    carouselItemContainer: {
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height / 5,
        backgroundColor: '#141414',
        borderRadius: 20,
        margin: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'rgba(20,20,20, 0.8)',
        width: '100%',
        textAlign: 'center',
        padding: 12,
    },
});
