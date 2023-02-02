import { Box, Divider, Icon } from "native-base";
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
                title="An image?"
                description="Marker With Pokestop Name"
                coordinate={{ latitude: latitude, longitude: longitude }}
            >
            </Marker>
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

/*
{this.state.markers.map((marker, index) => (
    <Marker
        key={index}
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
    />
))}
*/