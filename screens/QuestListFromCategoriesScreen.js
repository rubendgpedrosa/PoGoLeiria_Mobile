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
                const response = await fetch('https://raw.githubusercontent.com/rubendgpedrosa/PoGoLeiria_Data/main/' + categorySelected.toLowerCase() + '.json');
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
            <Text style={styles.questCategoriesTitle}>{ categorySelected + " TASKS" }</Text>
            <Divider mb="4" _light={{ bg: "muted.800" }} _dark={{ bg: "muted.50" }} />
            
            <ScrollView style={{ width:'100%' }}>
                {isLoading ? (
                    <View>
                        {[...Array(7)].map((_, i) => (
                            <View key={i} style={styles.skeletonQuestCardItem}>
                                    <Skeleton startColor="#141414" endColor="#292929" h="90" speed="0.75" />
                            </View>
                        ))}
                    </View>
                ) : (
                    quests.map((quest, index) => (
                        <TouchableOpacity 
                        key={index}
                        onPress={() => navigation.navigate('QuestMapLocationScreen', { latitude: quest.latitude, longitude: quest.longitude })} 
                        style={styles.questCardItem}
                        >
                            <View style={styles.rowContainerFullWidth}>
                                <Text style={ styles.textPrimary }>{quest.name}</Text>
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
        paddingTop: '6%',
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
        height: 90,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#141414',
        marginBottom: 10,
        elevation: 5,
    },
    textPrimary: {
        fontSize: 20,
        paddingLeft: 20,
        fontWeight: 'bold',
        color: '#EEE5E9',
        flex: 1,
    },
    rewardImage: {
        width: 60,
        height: 90,
        borderRadius: 10,
        backgroundColor: 'darkgray',
    },
    rowContainerFullWidth: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
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
        width: '100%',
        height: 90,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginBottom: 10,
        overflow: 'hidden',
    },
});
