import { Box, Divider, Flex, Button } from "native-base";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, View, FlatList } from 'react-native';

export default function QuestCategoriesScreen({ navigation }) {
    const catchingImage = require('../assets/categories/catching.png');
    const throwingImage = require('../assets/categories/pokeballgroup.png');
    const battlingImage = require('../assets/categories/raidpass.png');
    const buddyImage = require('../assets/categories/poliwag.png');
    const othersImage = require('../assets/categories/starpiece.png');
    const questsTypeCards = [
        { name: "CATCHING", image: catchingImage, style: { backgroundColor: '#f5c032' } },
        { name: "THROWING", image: throwingImage, style: { backgroundColor: '#388f74' } },
        { name: "BATTLING", image: battlingImage, style: { backgroundColor: '#e77043' } },
        { name: "BUDDY/FRIENDS", image: buddyImage, style: { backgroundColor: '#7a5ccf' } },
        { name: "OTHERS", image: othersImage, style: { backgroundColor: '#d36d95' } },
    ];

    const handleSelectedZone = (zone) => {
        console.log(zone);
    }

    return (
        <View style={{height: '100%'}}>
            <Flex direction="row" style={ styles.rowTopCategoryScreen }>
            <View style={styles.infoBanner}>
                <Text style={styles.infoText}>Seleciona uma zona antes de começar</Text>
            </View>
            </Flex>
            <Flex direction="row" style={ styles.rowTopCategoryScreen }>
                <Button style={styles.buttonZoneSelection} onPress={() => handleSelectedZone("leiria")}><Text style={styles.buttonZoneSelectionText}>Leiria</Text></Button>
                <Button style={styles.buttonZoneSelection} onPress={() => handleSelectedZone("marinha")}><Text style={styles.buttonZoneSelectionText}>Marinha</Text></Button>
            </Flex>
            <FlatList
            data={questsTypeCards}
            numColumns={2}
            style={styles.scrollViewContainer}
            renderItem={({ item: questTypeCard }) => (
                <TouchableOpacity style={[styles.cardContainer, styles.darkerGrayColor]} onPress={() => navigation.navigate('QuestListFromCategoriesScreen', { categorySelected: questTypeCard.name, categoryColor: questTypeCard.style })}>
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
        </View>
        
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
    },
    infoBanner: {
        backgroundColor: 'rgba(135, 206, 235, 0.1)',
        borderWidth: 1,
        borderColor: '#87CEEB',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        width: '100%',
    },
    infoText: {
        color: '#87CEEB',
        fontSize: 16,
    },
    rowTopCategoryScreen: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#070707', 
    },
    buttonZoneSelection: {
        backgroundColor: '#141414',
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        width: '40%',
    },
    buttonZoneSelectionText: {
        color: 'white',
    },
});
