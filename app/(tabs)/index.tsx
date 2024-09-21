import { Image, StyleSheet, Platform, TextInput, Button, Text, useColorScheme } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const apiURL = 'https://ewnscan.hexato.io';

interface WalletStats {
  guess_count: number;
  open_count: number;
  burn_count: number;
  contribution_count: number;
  tokens_earned: number;
}

export default function HomeScreen() {
  const [walletStats, setWalletStats] = useState<WalletStats | null>(null);
  const themeColor = useColorScheme();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function getWalletStats() {
    const walletId = await SecureStore.getItemAsync('walletID');
    if (!walletId) {
      return;
    }
    const response = await fetch(`${apiURL}/wallet/${walletId}`);
    const data = await response.json();

    setWalletStats(data);
    setLastUpdated(new Date());
  }

  useEffect(() => {
    getWalletStats();
    setLastUpdated(new Date());

    // every 30 seconds get the wallet stats
    const interval = setInterval(() => {
      getWalletStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Guesses', value: walletStats?.guess_count, icon: 'question-circle-o' },
    { label: 'Opens', value: walletStats?.open_count, icon: 'folder-open' },
    { label: 'Burns', value: walletStats?.burn_count, icon: 'fire' },
    { label: 'Contributions', value: walletStats?.contribution_count, icon: 'envelope-o' },
    { label: 'Tokens Earned', value: walletStats?.tokens_earned?.toFixed(4), icon: 'money' },
  ];

  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 200,
      width: "100%",
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    statsContainer: {
      gap: 8,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gridItem: {
      width: '48%', // Adjust the width to fit two items per row
      marginBottom: 8,
      padding: 16,
    },
    statLabel: {
      fontSize: 20,
    },
    statValue: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    icon: {
      marginBottom: 4,
    },
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/cat.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Wallet Stats</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>Last Updated: {lastUpdated?.toLocaleTimeString()}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.statsContainer}>
        <View style={styles.grid}>
          {stats.map((stat, index) => (

            <View key={index} style={stat.label === 'Tokens Earned' ? { ...styles.gridItem, width: '100%' } : styles.gridItem}>
              <FontAwesome style={styles.icon} name={stat.icon} size={24} color={themeColor === 'dark' ? '#fff' : '#333'} />
              <ThemedText style={styles.statLabel}>{stat.label}:</ThemedText>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}
