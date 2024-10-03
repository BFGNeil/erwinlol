import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, Button, TextInput } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import Box from "@/components/box";
import getWalletBoxes from "@/hooks/getWalletBoxes";

export default function Boxes() {
  const [walletBoxes, setWalletBoxes] = useState<WalletBox | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  interface WalletBox {
    total: number;
    boxes: {
      box_id: number;
      rewards: number;
      guesses: number;
      is_burned: boolean;
      opened_at: string;
      opener_wallet: string;
      spawned_at: string;
      state: boolean;
      sate_str: string;
    }[];
  }

  useEffect(() => {
    getWalletBoxes().then((data) => {
      setWalletBoxes(data);
      setLastUpdated(new Date());
    });

    //every 30 seconds get the wallet stats
    const interval = setInterval(() => {
      getWalletBoxes().then((data) => {
        setWalletBoxes(data);
        setLastUpdated(new Date());
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/cat-in-box.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">Recent Boxes</ThemedText>
        <ThemedText>
          Last Updated: {lastUpdated?.toLocaleTimeString()}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {walletBoxes?.boxes.map((box, index) => (
          <ThemedView key={index}>
            <Box {...box} />
          </ThemedView>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
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
    position: "absolute",
  },
});
