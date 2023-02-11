import { Skeleton, Divider, Input, Icon } from "native-base";
import { useState, useEffect, useCallback, useContext } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, ScrollView, Image, View, RefreshControl } from 'react-native';

import combatPower from '../library/combatPower';
import pokestopImages from '../library/pokestopImages';
import axios from "axios";

import { FilterContext } from "../store/FilterContext";

export default function QuestCategoriesScreen({ route, navigation }) {
    const { categorySelected, categoryColor, selectedZone } = route.params;
    const [quests, setQuests] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { filter } = useContext(FilterContext);

    const handleClearSearchTerm = () => {
        setSearchTerm('');
    }

    // Fetch data initially
    // https://raw.githubusercontent.com/rubendgpedrosa/PoGoLeiria_Data/main/catching.json
    // Make fetch request from url above and set the data to quests
    const getQuestsFromGithubRawFileByCategory = async () => {
        try {
            const response = await (async () => {
                let url = `https://pogoleiria-default-rtdb.europe-west1.firebasedatabase.app/${categorySelected.toLowerCase()}.json`
                if (categorySelected.toLowerCase().includes('buddy')) {
                    url = `https://pogoleiria-default-rtdb.europe-west1.firebasedatabase.app/buddy.json`
                }
                let myHeaders = new Headers();
                myHeaders.set('Accept', 'application/json');
                myHeaders.set('Content-Type', 'application/json');
                myHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
                myHeaders.set('Pragma', 'no-cache');
                myHeaders.set('Expires', '0');
                const response = await axios.get(url, {
                    method: 'GET',
                    headers: myHeaders
                }).catch(error => {
                    console.log(error);
                });
                return response.data;
            })();
    

            let filteredResponse = [];
            if (response !== null && typeof response[0] === 'object') {
                if(selectedZone === "leiria"){
                    filteredResponse = response.map(task => {
                        return {...task, pokestops: task.pokestops.filter(pokestop => !String(pokestop.longitude).startsWith("-8.9"))};
                    });
                }
                if(selectedZone === "marinha"){
                    filteredResponse = response.map(task => {
                        return {...task, pokestops: task.pokestops.filter(pokestop => String(pokestop.longitude).startsWith("-8.9"))};
                    });
                }
                filteredResponse = filteredResponse.filter(task => task.pokestops.length > 0);
            }

            setQuests(filteredResponse);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRewardImage = (quest) => {
        if (quest.quest_reward_type === 'Pokemon') {
            return pokestopImages(quest.quest_reward_pokemon_id.toString().padStart(3, "0"));
        } else if (quest.quest_reward_type === 'Energy') {
            return pokestopImages(
                quest.quest_reward_pokemon_name.toLowerCase().replace(/\s/g, "") +
                quest.quest_reward_item_name.toLowerCase().replace(/\s/g, "")
            );
        } else {
            return pokestopImages(quest.quest_reward_item_name.toLowerCase().replace(/\s/g, ""));
        }
    }

    const onRefresh = useCallback(() => {
        setLoading(true);
        getQuestsFromGithubRawFileByCategory()
    }, []);

    useEffect(() => {
        getQuestsFromGithubRawFileByCategory();
    }, []);

    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Input placeholder="Quest Name / Reward" width="100%" borderRadius="4" py="3" px="1" fontSize="14" style={{color: '#c0c0c0'}}
            InputLeftElement={<Icon m="2" ml="3" size="6" color="#c0c0c0" as={<MaterialIcons name="search" />} />} onChangeText={(text) => setSearchTerm(text)}
            InputRightElement={searchTerm ?
            <TouchableOpacity onPress={handleClearSearchTerm}>
            <Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="close" />} />
            </TouchableOpacity> : null}
            value={searchTerm}
            />
            <Divider mt="4" _light={{ bg: "muted.800" }} _dark={{ bg: "muted.50" }} />
            <ScrollView style={{ width:'100%', paddingHorizontal: '2%', paddingTop: 10 }}
            refreshControl={ <RefreshControl refreshing={isLoading} onRefresh={onRefresh} /> }
            >
                {isLoading ? (
                    <View>
                        {[...Array(12)].map((_, i) => (
                            <View key={i} style={styles.skeletonQuestCardItem}>
                                    <Skeleton startColor="#141414" endColor="#292929" h="90" speed="0.75" />
                            </View>
                        ))}
                    </View>
                ) : quests.filter((quest) =>
                        quest.quest_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        quest.quest_reward.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length ? (
                    quests.filter((quest) =>
                        quest.quest_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        quest.quest_reward.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .filter((quest) => {
                        if (filter === 'all') {
                            return true;
                        } else if (filter === 'pokemon') {
                            return quest.quest_reward_type === 'Pokemon';
                        } else if (filter === 'items') {
                            return quest.quest_reward_type !== 'Pokemon';
                        }
                    }).length ? 
                    quests.filter((quest) =>
                        quest.quest_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        quest.quest_reward.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .filter((quest) => {
                        if (filter === 'all') {
                            return true;
                        } else if (filter === 'pokemon') {
                            return quest.quest_reward_type === 'Pokemon';
                        } else if (filter === 'items') {
                            return quest.quest_reward_type !== 'Pokemon';
                        }
                    })
                    .map((quest, index) => (
                        <TouchableOpacity 
                        key={index}
                        onPress={() => navigation.navigate('QuestMapLocationScreen', { category: quest })} 
                        style={styles.questCardItem}
                        >
                            <View style={styles.rowContainerFullWidth}>
                                <View style={styles.textContainer}>
                                    <Text style={ styles.textPrimary }>{quest.quest_description}
                                    </Text>
                                    <Text style={ styles.textSecondary }>Nº Pokestops: { quest.pokestops.length ?? 0 }</Text>
                                </View>
                                <View>
                                    <Image style={Object.assign({}, styles.rewardImage, categoryColor )} resizeMode='contain' source={handleRewardImage(quest) } />
                                    {quest.quest_reward_type === 'Pokemon' ?
                                    <Text style={styles.badgeRewardImage}>
                                        {combatPower[quest.quest_reward_pokemon_id].replace(/\,/g,'')}
                                    </Text> :
                                    <Text style={styles.badgeRewardImage}>
                                        x{quest.quest_reward_amount}
                                    </Text> 
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                    )) : (
                        <Text style={{color: '#c0c0c0' }}>No Results</Text>
                    )
                ) : (
                    <Text style={{color: '#c0c0c0' }}>No Results</Text>
                )}
            </ScrollView>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '4%',
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
        backgroundColor: '#f5c032',
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
    badgeRewardImage: {
        color: 'white', 
        position: 'absolute', 
        bottom: 0, 
        textAlign: 'center',
        backgroundColor: '#141414',
        opacity: 0.8,
        width: '100%',
        fontWeight: 'bold',
    }
});
