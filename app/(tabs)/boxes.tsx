import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import Box from '@/components/box';

const apiURL = 'https://ewnscan.hexato.io';


async function saveWalletID(walletID: string) {
  await SecureStore.setItemAsync('walletID', walletID);
}


export default function Boxes() {

  const [walletBoxes, setWalletBoxes] = useState<WalletBox | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  interface WalletBox {
    total: number;
    boxes: {
      box_id: number;
      rewards: number;
      guesses: number;
    }[];
  }

  useEffect(() => {
      getWalletBoxes();
  
      //every 30 seconds get the wallet stats
      const interval = setInterval(() => {
        getWalletBoxes();
      }, 5000);
  
      return () => clearInterval(interval);
      
    
  }, []);
  

  async function getWalletBoxes() {
    const walletId = await SecureStore.getItemAsync('walletID');
    if (!walletId) {
      return;
    }
    const response = await fetch(`${apiURL}/wallet/${walletId}/boxes`);
    const data = await response.json();

    const walletBoxes = {
      total: data.total,
      boxes: data.boxes.map((box: any) => {
        return {
          box_id: box.box_id,
          rewards: box.rewards,
          guesses: box.guesses,
        };
      }
    }

    setWalletBoxes(walletBoxes);
    setLastUpdated(new Date());



  
  }

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    headerImage={
      <Image
        source={require('@/assets/images/cat-in-box.jpg')}
        style={styles.reactLogo}
      />
    }>
      <ThemedView >
        <ThemedText type="title">Recent Boxes</ThemedText>
        <ThemedText >Last Updated: {lastUpdated?.toLocaleTimeString()}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {
          walletBoxes?.boxes.map((box, index) => (
            <ThemedView key={index}>
              <Box {...box} />
            </ThemedView>
          ))
        }
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
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
