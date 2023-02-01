import { Box, Divider } from "native-base";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, Image, View } from 'react-native';

export default function QuestCategoriesScreen({ route, navigation }) {
    const { categorySelected } = route.params;
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data initially

    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.questCategoriesTitle}>{ categorySelected + " TASKS" }</Text>
            <Divider mb="4" _light={{ bg: "muted.800" }} _dark={{ bg: "muted.50" }} />
            <TouchableOpacity onPress={() => navigation.navigate('QuestMapLocationScreen')} style={styles.questcardItem}>
                <View style={styles.rowContainerFullWidth}>
                    <Text style={styles.textPrimary}>CATCH 5 POKEMON</Text>
                    <Image style={styles.rewardImage}></Image>
                </View>
            </TouchableOpacity>
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
    questcardItem: {
        width: '97%',
        height: 90,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#141414'
    },
    textPrimary: {
        fontSize: 20,
        paddingLeft: 20,
        fontWeight: 'bold',
        color: '#EEE5E9',
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
});
