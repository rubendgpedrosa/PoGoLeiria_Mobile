import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QuestCategoriesScreen() {
    return ( 
        <View>
            <Text style={styles.markerDot}></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    markerDot: {
        width: 12,
        height: 12,
        borderRadius: 10,
        backgroundColor: '#71ABFF',
    },
});
