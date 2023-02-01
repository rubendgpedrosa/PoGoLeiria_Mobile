import { Box, Divider } from "native-base";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';

export default function QuestMapLocationScreen({ route, navigation }) {
    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.questCategoriesTitle}>QUEST MAP</Text>
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
