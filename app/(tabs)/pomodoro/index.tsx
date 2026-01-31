import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Import the shared header
import AppHeader from "../../../components/AppHeader";

export default function Pomodoro() {
  return (
    <View style={styles.container}>
      {/* 1. Add the Header component here */}
      <AppHeader />

      <View style={styles.content}>
        <Text style={styles.title}>Pomodoro Screen</Text>
        <Text style={styles.subtitle}>Time to focus and be productive! 🍅</Text>

        {/* You can eventually place your large timer clock here */}
        <View style={styles.timerPlaceholder}>
          <Text style={{ fontSize: 80, fontWeight: "900", color: "#502707" }}>25:00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6E5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#4E9C8F",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 8,
    textAlign: "center",
  },
  timerPlaceholder: {
    marginTop: 40,
    padding: 40,
    borderRadius: 100,
    backgroundColor: "#DED4C1", // Matching your header pill color
  },
});
