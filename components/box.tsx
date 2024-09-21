/*
      box_id: number;
      rewards: number;
      guesses: number;
      */


import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
    import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';

export default function Box({ box_id, rewards, guesses }) {
    const themeColor = useColorScheme();
   
    const styles = StyleSheet.create({
        boxContainer: {
            padding: 20,
            marginBottom: 10,
            borderRadius: 10,
            shadowColor: '#000',
            backgroundColor: themeColor === 'dark' ? '#333' : '#fff',
            color: themeColor === 'dark' ? '#fff' : '#333',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
        },
        boxId: {
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 10,
            color: themeColor === 'dark' ? '#fff' : '#333',
        },
        rewards: {
            fontSize: 16,
            color: '#28a745',
            marginBottom: 5,
        
        },
        guesses: {
            fontSize: 16,
            color: '#dc3545',
        },
    });

    return (
        <View style={styles.boxContainer}>
            <ThemedText style={styles.boxId}>{box_id}</ThemedText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '49%' }}>
                <FontAwesome name="money" size={48} color="#28a745" />
                <ThemedText> Rewards: {
                //round to 4 decimal places
                rewards.toFixed(4)
                }</ThemedText>
                </View>
                <View style={{ width: '49%' }}>
                <FontAwesome name="search" size={48} color="#dc3545" />
                <ThemedText> Guesses: {guesses}</ThemedText>
                </View>
            </View>
        </View>
    );

}