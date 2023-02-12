import pokestopImages from "../../library/pokestopImages";
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Text, View, ImageBackground } from "react-native";

export default function QuestMapCard(props) {
  const openGoogleMaps = () => {
    var scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    var url = scheme + `${props.pokestopLatitude},${props.pokestopLongitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.carouselItemContainer}>
      <ImageBackground
        style={styles.image}
        source={pokestopImages(props.pokestopId.replace(/\./g, ""))}
      >
        <Text style={styles.currentPlacementItemNumber}>{props.currentPlacement}</Text>
      </ImageBackground>
      <Text style={styles.carouselText}>{props.pokestopName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  carouselItemContainer: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 5,
    backgroundColor: "#141414",
    borderRadius: 10,
    margin: 10,
    marginBottom: 28,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(20,20,20, 0.9)",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    paddingVertical: 4,
  },
  currentPlacementItemNumber: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "rgba(20, 20, 20, 0.9)",
    textAlign: "center",
    padding: 8,
    paddingVertical: 4,
    position: "absolute",
    top: 0,
    right: 0,
    borderBottomLeftRadius: 10,
  },
});
