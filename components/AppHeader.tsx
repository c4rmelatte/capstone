import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AppHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* LEFT: Menu Toggle */}
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          className="p-2"
        >
          <Ionicons name="menu" size={28} color="#502707" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} className="ml-2">
          STUBY
        </Text>
      </View>

      {/* RIGHT: Combined Timer and Music */}
      <View className="flex-row items-center gap-x-2">
        {/* Pomodoro Pill */}
        <TouchableOpacity style={styles.timerPill} className="flex-row items-center shadow-sm">
          <Text style={styles.timerText}>17:00</Text>
          <Ionicons name="pause" size={16} color="#502707" className="ml-2" />
        </TouchableOpacity>

        {/* Music Circle */}
        <TouchableOpacity style={styles.musicCircle} className="shadow-sm">
          <Ionicons name="musical-notes-outline" size={18} color="#502707" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#502707",
  },
  timerPill: {
    backgroundColor: "#DED4C1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timerText: {
    color: "#502707",
    fontWeight: "700",
    fontSize: 16,
  },
  musicCircle: {
    backgroundColor: "#DED4C1",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
