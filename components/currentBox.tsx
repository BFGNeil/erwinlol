import getCurrentBox from "@/hooks/getCurrentBox";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "react-native";

export default function CurrentBox() {
  const [currentBox, setCurrentBox] = useState<CurrentBoxType | null>(null);
  const themeColor = useColorScheme();

  interface CurrentBoxType {
    box_id: number;
    state: boolean;
    state_str: string;
    spawned_at: string;
    opened_at: string;
    decay_number: number;
    opener_wallet: string;
    is_burned: boolean;
    contents: string;
    password: string;
    contributors: string[];
    events: string[];
  }

  useEffect(() => {
    getCurrentBox().then((data) => {
      setCurrentBox(data);
    });
  }, []);

  const styles = StyleSheet.create({
    boxContainer: {
      padding: 20,
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: "#000",
      backgroundColor: themeColor === "dark" ? "#333" : "#fff",
      color: themeColor === "dark" ? "#fff" : "#333",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    boxId: {
      fontSize: 17,
      fontWeight: "bold",
      marginBottom: 10,
      color: themeColor === "dark" ? "#fff" : "#333",
    },
    rewards: {
      fontSize: 16,
      color: "#28a745",
      marginBottom: 5,
    },
    guesses: {
      fontSize: 16,
      color: "#dc3545",
    },
  });

  const formattedDate = new Date(currentBox?.opened_at).toLocaleString();

  return (
    <View style={styles.boxContainer}>
      <ThemedText style={styles.boxId}>{currentBox?.box_id}</ThemedText>
      <ThemedText>Spawned At: {currentBox?.spawned_at}</ThemedText>
      <ThemedText>Decay Number: {currentBox?.decay_number}</ThemedText>
      <ThemedText>Opener Wallet: {currentBox?.opener_wallet}</ThemedText>
      <ThemedText>Is Burned: {currentBox?.is_burned ? "Yes" : "No"}</ThemedText>
      <ThemedText>Contents: {currentBox?.contents}</ThemedText>
      <ThemedText>Password: {currentBox?.password}</ThemedText>
      <ThemedText>
        Contributors: {currentBox?.contributors.join(", ")}
      </ThemedText>
      <ThemedText>Events: {currentBox?.events.join(", ")}</ThemedText>
    </View>
  );
}
