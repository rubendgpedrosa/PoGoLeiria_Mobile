import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import * as Location from "expo-location";
import QuestMapCard from "../components/questmapscreen/QuestMapCard";

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
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const changeRegion = async (targetLatitude, targetLongitude) => {
    mapRef.current.animateToRegion({
      latitude: targetLatitude,
      longitude: targetLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const handleMarkerPress = (index) => {
    // set the new region based on the selected pokestop
    const selectedPokestop = category.pokestops[index];
    changeRegion(selectedPokestop.latitude, selectedPokestop.longitude);

    // scroll the FlatList to the selected item
    listRef.current.scrollToIndex({ index });
  };

  const openGps = (latitude, longitude) => {
    var scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    var url = scheme + `${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        style={styles.map}
        toolbarEnabled={false}
        userInterfaceStyle="dark"
        region={region.mapRegion}
        initialRegion={{
          latitude: category.pokestops[0].latitude,
          longitude: category.pokestops[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {category.pokestops.map((pokestop, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: pokestop.latitude,
              longitude: pokestop.longitude,
            }}
            onPress={() => handleMarkerPress(index)}
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
        style={{ position: "absolute", bottom: 4 }}
        getItemLayout={(data, index) => ({
            length: Dimensions.get("window").width,
            offset: Dimensions.get("window").width * index,
            index,
        })}
        renderItem={({ item, index }) => {
            return (
            <QuestMapCard
                key={index}
                pokestopId={item.pokestop_id}
                pokestopName={item.name}
                pokestopLatitude={item.latitude}
                pokestopLongitude={item.longitude}
                currentPlacement={index + 1 + "/" + category.pokestops.length}
            ></QuestMapCard>
            );
        }}
        onMomentumScrollEnd={(event) => {
            const index = Math.round(
            event.nativeEvent.contentOffset.x / Dimensions.get("window").width
            );
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
});
