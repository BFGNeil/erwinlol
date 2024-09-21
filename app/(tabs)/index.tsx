import { Image, StyleSheet, Platform, TextInput, Button, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

const apiURL = 'https://ewnscan.hexato.io';

export default function HomeScreen() {
const [walletStats, setWalletStats] = useState<WalletStats | null>(null);interface WalletStats {
  guess_count: number;
  open_count: number;
  burn_count: number;
  contribution_count: number;
  tokens_earned: number;
}

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

    //every 30 seconds get the wallet stats
    const interval = setInterval(() => {
      getWalletStats();
    }, 5000);

    return () => clearInterval(interval);
    
  }, []);


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
        <ThemedText>Last Updated: 
          {lastUpdated?.toLocaleTimeString()}
        </ThemedText>
        
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          Guesses: {walletStats?.guess_count}
        </ThemedText>
        <ThemedText>
          Opens: {walletStats?.open_count}
        </ThemedText>
        <ThemedText>
          Burns: {walletStats?.burn_count}
        </ThemedText>
        <ThemedText>
          Contributions: {walletStats?.contribution_count}
        </ThemedText>
        <ThemedText>
          Tokens Earned: {
          //round to 4 decimal places
          walletStats?.tokens_earned.toFixed(4)
          }
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

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
});
