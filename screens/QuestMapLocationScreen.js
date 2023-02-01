import { Box, Divider } from "native-base";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function QuestMapLocationScreen({ route, navigation }) {
    const { latitude, longitude } = route.params;

    return ( 
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{ latitude: latitude, longitude: longitude, latitudeDelta: 0.01, longitudeDelta: 0.01,}}>
            <Marker
                key={1}
                coordinate={{ latitude: latitude, longitude: longitude }}
            />
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
});
