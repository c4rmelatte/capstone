import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export default function WavedBg() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Bottom (Green) FIRST */}
      <View style={styles.green} />

      {/* Top (Yellow) SECOND */}
      <View style={styles.yellow} />
    </View>
  );
}

const styles = StyleSheet.create({
  green: {
    position: "absolute",
    bottom: -height * 0.1, // pull upward to expose curve
    width,
    height: height * 0.6,
    backgroundColor: "#7ABBAF",
    borderTopLeftRadius: 200,
    zIndex: 1,
  },

  yellow: {
    position: "absolute",
    top: 0,
    width,
    height: height * 0.6,
    backgroundColor: "#FFF8E7",
    borderBottomRightRadius: 200,
    zIndex: 2,
  },
});
