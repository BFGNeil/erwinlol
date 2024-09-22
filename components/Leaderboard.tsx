import React, { useEffect, useState } from "react";
import { Text, StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "./ThemedText";
import getLeaderboard from "@/hooks/getLeaderboard";
import TrimmedText from "./trimmedText";

export default function Leaderboard() {
  const themeColor = useColorScheme();

  const [rankings, setRankings] = useState<Rankings[] | null>(null); // Add the Rankings interfac

  interface Rankings {
    wallet_id: string;
    guess_count: number;
    open_count: number;
    burn_count: number;
    contribution_count: number;
    tokens_earned: number;
  }

  useEffect(() => {
    getLeaderboard().then((data) => {
      setRankings(data);
    });
  }, []);

  const styles = StyleSheet.create({
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    gridItem: {
      width: "49%", // Adjust the width to fit two items per row
      marginBottom: 8,
      padding: 16,
      borderRadius: 8,
      backgroundColor: themeColor === "dark" ? "#333" : "#fff",
    },
    gridLeaderboardItem: {
      width: "100%",
      marginBottom: 8,
      padding: 16,
      borderRadius: 8,
      backgroundColor: themeColor === "dark" ? "#333" : "#fff",
    },
  });

  return (
    <View>
      <ThemedText type="title" style={{ marginBottom: 8 }}>
        Leaderboard
      </ThemedText>
      <View style={styles.grid}>
        {rankings &&
          rankings.map((ranking, index) => (
            <View style={styles.gridLeaderboardItem} key={index}>
              {index === 0 && <ThemedText>🥇</ThemedText>}
              {index === 1 && <ThemedText>🥈</ThemedText>}
              {index === 2 && <ThemedText>🥉</ThemedText>}
              <ThemedText>Rank: {index + 1}</ThemedText>
              <TrimmedText
                text={"Wallet: " + ranking.wallet_id}
                maxLength={35}
              />
              <ThemedText>Guesses: {ranking.guess_count}</ThemedText>
              <ThemedText>Boxes Opened: {ranking.open_count}</ThemedText>
              <ThemedText>Boxes Burned: {ranking.burn_count}</ThemedText>
              <ThemedText>
                Box Contributions: {ranking.contribution_count}
              </ThemedText>
              <ThemedText>
                Tokens Earned: {ranking.tokens_earned.toFixed(4)}
              </ThemedText>
            </View>
          ))}
      </View>
    </View>
  );
}
