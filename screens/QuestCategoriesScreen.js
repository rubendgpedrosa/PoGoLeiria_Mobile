import { Box, Divider } from "native-base";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, View, FlatList } from 'react-native';

export default function QuestCategoriesScreen({ navigation }) {
    const catchingImage = require('../assets/categories/singlepokeball.png');
    const throwingImage = require('../assets/categories/pokeballgroup.png');
    const battlingImage = require('../assets/categories/raidpass.png');
    const buddyImage = require('../assets/categories/poliwag.png');
    const othersImage = require('../assets/categories/starpiece.png');
    const questsTypeCards = [
        { name: "CATCHING", image: catchingImage, style: { backgroundColor: '#f5c032' } },
        { name: "THROWING", image: throwingImage, style: { backgroundColor: '#388f74' } },
        { name: "BATTLING", image: battlingImage, style: { backgroundColor: '#de3097' } },
        { name: "BUDDY/FRIENDS", image: buddyImage, style: { backgroundColor: '#e77043' } },
        { name: "OTHERS", image: othersImage, style: { backgroundColor: '#d36d95' } },
    ];

    return (
        <FlatList
        data={questsTypeCards}
        numColumns={2}
        style={styles.scrollViewContainer}
        renderItem={({ item: questTypeCard }) => (
            <TouchableOpacity style={[styles.cardContainer, styles.darkerGrayColor]} onPress={() => navigation.navigate('QuestListFromCategoriesScreen', { categorySelected: questTypeCard.name })}>
                <ImageBackground
                    resizeMode="cover"
                    source={questTypeCard.image}
                    style={styles.image}></ImageBackground>
                <View style={styles.textContainer}>
                    <Text style={Object.assign({}, styles.textBackground, questTypeCard.style)}>{questTypeCard.name}</Text>
                </View>
            </TouchableOpacity>
        )}
        />
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: '#070707',
    },
    darkerGrayColor: {
        backgroundColor: '#141414',
    },
    cardContainer: {
        width: '45%',
        marginHorizontal: '2.5%',
        marginVertical: 10,
        borderRadius: 10,
    },
    image: {
        height: 80,
        width: 100,
        alignSelf: 'center',
        resizeMode: 'contain',
        padding: 10,
    },
    textBackground: {
        fontWeight: '900',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 5,
    }
});
