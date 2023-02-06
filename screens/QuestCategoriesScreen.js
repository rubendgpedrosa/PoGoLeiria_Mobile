import { Flex } from "native-base";
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuestCategoriesScreen({ navigation }) {
    let test = 'starpiece';
    const catchingImage = require('../assets/categories/catching.png');
    const throwingImage = require('../assets/categories/pokeballgroup.png');
    const battlingImage = require('../assets/categories/raidpass.png');
    const buddyImage = require('../assets/categories/poliwag.png');
    const othersImage = require(`../assets/categories/${test}.png`);
    const questsTypeCards = [
        { name: "CATCHING", image: catchingImage, style: { backgroundColor: '#f5c032' } },
        { name: "THROWING", image: throwingImage, style: { backgroundColor: '#388f74' } },
        { name: "BATTLING", image: battlingImage, style: { backgroundColor: '#e77043' } },
        { name: "BUDDY/FRIENDS", image: buddyImage, style: { backgroundColor: '#7a5ccf' } },
        { name: "OTHERS", image: othersImage, style: { backgroundColor: '#d36d95' } },
    ];
    const [selectedZone, setSelectedZone] = useState('leiria');

    const handleSelectedZone = async (zone) => {
        try {
            await AsyncStorage.setItem('@selectedZone', zone);
            setSelectedZone(zone);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const retrieveZone = async () => {
            try {
            const zone = await AsyncStorage.getItem('@selectedZone');
            if (zone !== null) {
                setSelectedZone(zone);
            }
        } catch (e) {
            console.error(e);
        }
        };
        retrieveZone();
    }, []);

    return (
        <View style={{height: '100%'}}>
            <Flex direction="row" style={ styles.rowTopCategoryScreen }>
            <View style={styles.infoBanner}>
                <Text style={styles.infoText}>
                    {selectedZone === null? "Seleciona uma zona antes de começar" : "Zona selecionada: " + selectedZone.charAt(0).toUpperCase() + selectedZone.slice(1)}
                </Text>
            </View>
            </Flex>
            <Flex direction="row" style={Object.assign({}, styles.rowTopCategoryScreen, { paddingBottom: 10 })}>
                <TouchableOpacity disabled={selectedZone === "leiria"} style={styles.buttonZoneSelection} onPress={() => handleSelectedZone("leiria")}><Text style={styles.buttonZoneSelectionText}>Leiria</Text></TouchableOpacity>
                <TouchableOpacity disabled={selectedZone === "marinha"}  style={styles.buttonZoneSelection} onPress={() => handleSelectedZone("marinha")}><Text style={styles.buttonZoneSelectionText}>Marinha</Text></TouchableOpacity>
            </Flex>
            <FlatList
            data={questsTypeCards}
            numColumns={2}
            style={styles.scrollViewContainer}
            renderItem={({ item: questTypeCard }) => (
                <TouchableOpacity
                    style={[styles.cardContainer, styles.darkerGrayColor]}
                    onPress={() => navigation.navigate('QuestListFromCategoriesScreen',
                    { categorySelected: questTypeCard.name, categoryColor: questTypeCard.style, selectedZone: selectedZone }
                )}>
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
        marginBottom: 0,
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
