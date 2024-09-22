import { Image, StyleSheet, useColorScheme } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import getWalletStats from "@/hooks/getWalletStats";
import Leaderboard from "@/components/Leaderboard";
import CurrentBox from "@/components/currentBox";

const apiURL = "https://ewnscan.hexato.io";

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

  useEffect(() => {
    getWalletStats().then((data) => {
      setWalletStats(data);

      setLastUpdated(new Date());
    });

    // every 30 seconds get the wallet stats
    const interval = setInterval(() => {
      getWalletStats().then((data) => {
        setWalletStats(data);

        setLastUpdated(new Date());
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Guesses",
      value: walletStats?.guess_count,
      icon: "key",
    },
    {
      label: "Box Contributions",
      value: walletStats?.contribution_count,
      icon: "bars-progress",
    },
    {
      label: "Boxes Opened",
      value: walletStats?.open_count,
      icon: "box-open",
    },
    { label: "Boxes Burned", value: walletStats?.burn_count, icon: "fire" },

    {
      label: "Tokens Earned",
      value: walletStats?.tokens_earned?.toFixed(4),
      icon: "coins",
    },
  ];

  const styles = StyleSheet.create({
    stepContainer: {
      marginBottom: 8,
    },
    reactLogo: {
      height: 200,
      width: "100%",
      bottom: 0,
      left: 0,
      position: "absolute",
    },
    statsContainer: {
      gap: 8,
    },
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
    gridItemFull: {
      width: "100%",
      marginBottom: 8,
      padding: 16,
      borderRadius: 8,
      backgroundColor: themeColor === "dark" ? "#333" : "#fff",
      //row
      flexDirection: "row",
    },
    statLabel: {
      fontSize: 20,
    },
    statValue: {
      fontSize: 25,
      fontWeight: "bold",
    },
    icon: {
      marginBottom: 8,
    },
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/cat.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">Wallet Stats</ThemedText>
        <ThemedText>
          Last Updated: {lastUpdated?.toLocaleTimeString()}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <View style={styles.grid}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={
                stat.label === "Tokens Earned"
                  ? { ...styles.gridItemFull }
                  : styles.gridItem
              }
            >
              <FontAwesome6
                style={styles.icon}
                name={stat.icon}
                size={48}
                color={themeColor === "dark" ? "#fff" : "#333"}
              />
              <View
                style={
                  stat.label === "Tokens Earned"
                    ? { flex: 1, marginLeft: 8 }
                    : {}
                }
              >
                <ThemedText style={{ marginBottom: 8 }}>
                  {stat.label}
                </ThemedText>
                <ThemedText type="defaultSemiBold">{stat.value}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </ThemedView>
      <ThemedView style={styles.statsContainer}>
        <View style={styles.grid}>
          <ThemedText type="title" style={{ marginBottom: 8 }}>
            Current Box
          </ThemedText>
          <CurrentBox />
        </View>
      </ThemedView>
      <ThemedView style={styles.statsContainer}>
        <View style={styles.grid}>
          <Leaderboard />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}
