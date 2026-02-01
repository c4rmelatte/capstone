import { StyleSheet, Text, View } from "react-native";
// 1. Import your custom header
import AppHeader from "../../../components/AppHeader";

export default function Flashcard() {
  return (
    <View style={styles.container}>
      {/* 2. Add the Header at the very top */}
      <AppHeader />

      <View style={styles.content}>
        <Text style={styles.title}>Flashcard Screen</Text>
        <Text style={styles.subtitle}>Time to ace those exams! 🧠</Text>
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
