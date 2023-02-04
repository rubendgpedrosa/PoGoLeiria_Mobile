import { Skeleton, Divider } from "native-base";
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, Image, View } from 'react-native';

export default function QuestCategoriesScreen({ route, navigation }) {
    const { categorySelected } = route.params;
    const [quests, setQuests] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data initially
    // https://raw.githubusercontent.com/rubendgpedrosa/PoGoLeiria_Data/main/catching.json
    // Make fetch request from url above and set the data to quests
    const getQuestsFromGithubRawFileByCategory = async () => {
        try {
            const response = await (async () => {
                let url = 'https://raw.githubusercontent.com/rubendgpedrosa/PoGoLeiria_Data/main/' + categorySelected.toLowerCase() + '.json'
                if (categorySelected.toLowerCase().includes('buddy')) {
                    url = 'https://raw.githubusercontent.com/rubendgpedrosa/PoGoLeiria_Data/main/buddy.json'
                }
                const response = await fetch(url);
                return response.json();
            })();
    
            setQuests(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getQuestsFromGithubRawFileByCategory();
    }, []);

    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text>{ categorySelected + " TASKS" }</Text>
            <Divider mb="4" _light={{ bg: "muted.800" }} _dark={{ bg: "muted.50" }} />
            
            <ScrollView style={{ width:'100%' }}>
                {isLoading ? (
                    <View>
                        {[...Array(12)].map((_, i) => (
                            <View key={i} style={styles.skeletonQuestCardItem}>
                                    <Skeleton startColor="#141414" endColor="#292929" h="90" speed="0.75" />
                            </View>
                        ))}
                    </View>
                ) : (
                    quests.map((quest, index) => (
                        <TouchableOpacity 
                        key={index}
                        onPress={() => navigation.navigate('QuestMapLocationScreen', { category: quest })} 
                        style={styles.questCardItem}
                        >
                            <View style={styles.rowContainerFullWidth}>
                                <View style={styles.textContainer}>
                                    <Text style={ styles.textPrimary }>{quest.quest_description}</Text>
                                    <Text style={ styles.textSecondary }>Nº Pokestops: { quest.pokestops.length ?? 0 }</Text>
                                </View>
                                <Image style={styles.rewardImage} resizeMode='contain' />
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '12%',
        paddingBottom: '4%',
        backgroundColor: '#070707',
    },
    questCategoriesTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EEE5E9',
        marginBottom: 20,
    },
    questCardItem: {
        width: '100%',
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#141414',
        marginBottom: 10,
    },
    textContainer: { 
        flex: 1,
        justifyContent: 'center'
    },
    textPrimary: {
        fontSize: 16,
        paddingLeft: 20,
        paddingBottom: 0,
        marginBottom: 0,
        fontWeight: 'bold',
        color: '#EEE5E9',
    },
    textSecondary: {
        fontSize: 13,
        opacity: 0.6,
        paddingLeft: 20,
        color: '#EEE5E9',
    },
    rewardImage: {
        width: 60,
        height: 70,
        borderRadius: 10,
        backgroundColor: 'darkgray',
    },
    rowContainerFullWidth: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchContainer: {
        backgroundColor: '#EEE5E9',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    searchInput: {
        fontSize: 18,
    },
    skeletonQuestCardItem: {
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginBottom: 10,
        overflow: 'hidden',
    },
});
