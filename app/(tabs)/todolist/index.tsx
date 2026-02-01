import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
// Ensure this path matches your folder structure
import AppHeader from "../../../components/AppHeader";

export default function TodolistScreen() {
  return (
    // Base View MUST have flex: 1 and a background color
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 1. Add the Global Header here */}
      <AppHeader />

      <View style={styles.content}>
        <Text style={styles.title}>To Do List Screen</Text>
        <Text style={styles.subtitle}>Time to get things done! 📋</Text>

        {/* Placeholder for your list items */}
        <View className="mt-10 w-full px-10">
          <View className="bg-white p-4 rounded-xl border border-[#DED4C1] shadow-sm mb-3">
            <Text className="text-[#502707]">Example Task 1</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6E5", // Matches your cream theme
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
});
