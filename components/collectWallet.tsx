import { Button, Image, TextInput, useColorScheme } from "react-native";
import ParallaxScrollView from "./ParallaxScrollView";
import { ThemedView } from "./ThemedView";
import { HelloWave } from "./HelloWave";
import { ThemedText } from "./ThemedText";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function CollectWallet(props) {
    const {setWalletID, walletID} = props;
    const themeColor = useColorScheme();
    const [newWalletID, setNewWalletID] = useState<string | undefined>(undefined);

    async function saveWalletID() {
        await SecureStore.setItemAsync('walletID', newWalletID || '');
        setWalletID(newWalletID);
      }

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
          <HelloWave />
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
          
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Add your wallet ID to get started</ThemedText>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: themeColor === 'dark' ? 'white' : 'black' }}
            onChangeText={setNewWalletID}
            value={walletID}
          />
  
          <Button
            title="Save Wallet"
            onPress={() => {
              saveWalletID();
            }}
          />
        </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = {
    reactLogo: {
        height: 200,
        width: "100%",
        bottom: 0,
        left: 0,
        position: 'absolute',
      },
      titleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      },
      stepContainer: {
        marginBottom: 8,
      },
}
