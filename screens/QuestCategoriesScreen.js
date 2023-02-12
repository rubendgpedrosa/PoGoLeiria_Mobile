import { Flex } from "native-base";
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, FlatList, Linking } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuestCategoriesScreen({ navigation }) {
    const questsTypeCards = [
        { name: "Catching", image: require(`../assets/categories/catching.png`), style: { backgroundColor: '#6cbd63' } },
        { name: "Throwing", image: require(`../assets/categories/throwing.png`), style: { backgroundColor: '#ed7769' } },
        { name: "Battling", image: require(`../assets/categories/battling.png`), style: { backgroundColor: '#67acf6' } },
        { name: "Buddy/Friends", image: require(`../assets/categories/buddy.png`), style: { backgroundColor: '#b265cf' } },
        { name: "Others", image: require(`../assets/categories/others.png`), style: { backgroundColor: '#facd49' } },
        { name: "Mapa", image: require(`../assets/categories/mapa.png`), style: { backgroundColor: '#141414' } },
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

    const openPoGoLeiria = () => {
        Linking.openURL('https://pogoleiria.pt');
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
                        {selectedZone === null? "Seleciona uma zona antes de começar" : "Seleciona uma zona a explorar"}
                    </Text>
                </View>
            </Flex>
            <Flex direction="row" style={Object.assign({}, styles.rowTopCategoryScreen, { paddingBottom: 10 })}>
                <TouchableOpacity disabled={selectedZone === "leiria"} style={[styles.buttonZoneSelection, 
                    selectedZone !== "leiria" ? { opacity: 0.3 } : { opacity: 1, backgroundColor: '#141414' }
                ]} onPress={() => handleSelectedZone("leiria")}><Text style={styles.buttonZoneSelectionText}>Leiria</Text></TouchableOpacity>
                <TouchableOpacity disabled={selectedZone === "marinha"}  style={[styles.buttonZoneSelection, 
                    selectedZone !== "marinha" ? { opacity: 0.3 } : { opacity: 1, backgroundColor: '#141414' }
                ]} onPress={() => handleSelectedZone("marinha")}><Text style={styles.buttonZoneSelectionText}>Marinha</Text></TouchableOpacity>
            </Flex>
            <FlatList
            data={questsTypeCards}
            numColumns={2}
            style={styles.scrollViewContainer}
            renderItem={({ item: questTypeCard }) => (
                <TouchableOpacity
                    style={Object.assign({}, styles.cardContainer, questTypeCard.style)}
                    onPress={() => questTypeCard.name === "Mapa" ? openPoGoLeiria() : navigation.navigate('QuestListFromCategoriesScreen',
                    { categorySelected: questTypeCard.name, categoryColor: questTypeCard.style, selectedZone: selectedZone }
                )}>
                    <ImageBackground
                    resizeMode="contain"
                    source={questTypeCard.image}
                    style={{ 
                        width: '100%', 
                        height: 100, 
                        borderRadius: 10, 
                        position: 'absolute', 
                        bottom: -15, 
                        right: -55, 
                        opacity: 0.3,
                    }}
                    />
                    <Text style={styles.textBackground}>{questTypeCard.name}</Text>
                </TouchableOpacity>
            )}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: '#272727',
    },
    darkerGrayColor: {
        backgroundColor: '#141414',
    },
    cardContainer: {
        width: '45%',
        height: 90,
        marginHorizontal: '2.5%',
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    textBackground: {
        fontWeight: '900',
        fontSize: 24,
        color: 'white',
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    infoBanner: {
        backgroundColor: '#87CEEB',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        marginBottom: 0,
        width: '100%',
    },
    infoText: {
        color: 'white',
        fontSize: 16,
    },
    rowTopCategoryScreen: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#272727', 
        paddingHorizontal: 10,
    },
    buttonZoneSelection: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 10,
        width: '40%',
    },
    buttonZoneSelectionText: {
        color: 'white',
    }
});
