import { Ionicons } from "@expo/vector-icons"; // For the menu icon
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Notepad() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* ☰ MENU BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={30} color="#4E9C8F" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Notepad Screen</Text>
        <Text style={styles.subtitle}>Time to take some notes! 📝</Text>
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
