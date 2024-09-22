import getCurrentBox from "@/hooks/getCurrentBox";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import TrimmedText from "./trimmedText";

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
      //row
      flexDirection: "row",
    },
    boxId: {
      fontSize: 17,
      fontWeight: "bold",
      marginBottom: 10,
      color: themeColor === "dark" ? "#fff" : "#333",
      //text is overflowing, so we need to wrap it
      flexWrap: "wrap",
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

  const formattedDate = new Date(currentBox?.spawned_at).toLocaleString();

  //time since spawned, in hours and minutes, human readable
  const [timeSinceSpawned, setTimeSinceSpawned] = useState<string | null>(null);

  useEffect(() => {
    if (currentBox) {
      const timeSince =
        new Date().getTime() - new Date(currentBox.spawned_at).getTime();
      const hours = Math.floor(timeSince / 1000 / 60 / 60);
      const minutes = Math.floor((timeSince / 1000 / 60) % 60);
      setTimeSinceSpawned(`${hours} hours, ${minutes} minutes`);
    }
  }, [currentBox]);

  return (
    <View style={styles.boxContainer}>
      <FontAwesome6
        name="box"
        size={48}
        color={themeColor === "dark" ? "#fff" : "#333"}
        style={{ marginRight: 20 }}
      />
      <View>
        <TrimmedText text={currentBox?.box_id || ""} maxLength={30} />
        <ThemedText>Spawned At: {formattedDate}</ThemedText>
        <ThemedText>Time since spawn: {timeSinceSpawned}</ThemedText>
      </View>
    </View>
  );
}
