import { StyleSheet, Image, Button, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import saveWallet from '@/hooks/saveWallet';

export default function Settings() {

  const [walletID, setWalletID] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    SecureStore.getItemAsync('walletID').then((walletID) => {
      setWalletID(walletID || undefined);
    });
  }, []);
  
  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    headerImage={
      <Image
        source={require('@/assets/images/cat-in-box.jpg')}
        style={styles.reactLogo}
      />
    }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Wallet</ThemedText>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'white' }}
          onChangeText={setWalletID}
          value={walletID}
        />

        <Button
          title="Save Wallet ID"
          onPress={() => {
            saveWallet(walletID);
          }}
        />
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
  titleContainer: {
    flexDirection: 'row',
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
