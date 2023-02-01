import { Box, Divider } from "native-base";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function QuestCategoriesScreen({ navigation }) {
    const [questsTypeCards, setQuestsTypeCards] = useState(["CATCHING", "THROWING", "BATTLING", "BUDDY/FRIENDS", "OTHERS"]);
    const [clickedQuestTypeCard, setClickedQuestTypeCard] = useState("QUEST CATEGORIES");

    // Fetch data initially

    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.questCategoriesTitle}>{ clickedQuestTypeCard }</Text>
        <Divider mb="4" _light={{ bg: "muted.800" }} _dark={{ bg: "muted.50" }} />

        {questsTypeCards.map((questTypeCard, index) => {
            return (
            index % 2 === 0 && (
                <Box style={styles.boxStyle} key={questTypeCard}>
                <TouchableOpacity style={[styles.cardContainer, styles.darkerGrayColor]} onPress={() => navigation.navigate('QuestListFromCategoriesScreen', { categorySelected: questTypeCard })}>
                    <Text style={styles.textPrimary}>{questTypeCard} TASKS</Text>
                </TouchableOpacity>
                {index + 1 < questsTypeCards.length && (
                    <TouchableOpacity style={[styles.cardContainer, styles.darkerGrayColor]} onPress={() => navigation.navigate('QuestListFromCategoriesScreen', { categorySelected: questsTypeCards[index + 1] })}>
                    <Text style={styles.textPrimary}>{questsTypeCards[index + 1]} TASKS</Text>
                    </TouchableOpacity>
                )}
                </Box>
            )
            );
        })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#070707',
    },
    textPrimary: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EEE5E9',
    },
    primaryColor: {
        backgroundColor: '#177E89',
    },
    successColor: {
        backgroundColor: '#8CB369',
    },
    errorColor: {
        backgroundColor: '#DB3A34',
    },
    darkerGrayColor: {
        backgroundColor: '#141414',
    },
    gradientColorBackground: {
        backgroundColor: 'linear-gradient(90deg, rgba(23,126,137,1) 0%, rgba(23,126,137,1) 50%, rgba(23,126,137,1) 100%)',
        //Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        }
    },
    boxStyle: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cardContainer: {
        width: '46%',
        height: '90%',
        marginHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questCategoriesTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EEE5E9',
        marginBottom: 20,
    },
});
