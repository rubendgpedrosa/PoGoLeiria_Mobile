import { Box, Divider } from "native-base";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function QuestCategoriesScreen({ route, navigation }) {
    const { categorySelected } = route.params;

    // Fetch data initially

    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.questCategoriesTitle}>{ categorySelected + " TASKS" }</Text>
            <Divider mb="4" _light={{ bg: "muted.800" }} _dark={{ bg: "muted.50" }} />
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
    questCategoriesTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EEE5E9',
        marginBottom: 20,
    },
});
