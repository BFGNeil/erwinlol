/*
      box_id: number;
      rewards: number;
      guesses: number;
      */

    import React from 'react';
    import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export default function Box({ box_id, rewards, guesses }) {
    const themeColor = useColorScheme();
   
    const styles = StyleSheet.create({
        boxContainer: {
            padding: 20,
            margin: 10,
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
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
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
            <Text style={styles.boxId}>Box ID: {box_id}</Text>
            <Text style={styles.rewards}>Rewards: {rewards}</Text>
            <Text style={styles.guesses}>Guesses: {guesses}</Text>
        </View>
    );

}