import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppHeader from "../../../components/AppHeader";

export default function Music() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 1. Add the AppHeader component */}
      <AppHeader />

      <View style={styles.content}>
        <Text style={styles.title}>Music Screen</Text>
        <Text style={styles.subtitle}>Time to enjoy some tunes! 🎵</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6E5",
  },
  menuButton: {
    position: "absolute",
    top: "6%",
    left: "5%",
    zIndex: 10,
    padding: 10,
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
