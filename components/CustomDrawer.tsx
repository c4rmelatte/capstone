import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawer(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView
      {...props}
      // Use flexGrow to allow the footer to be pushed to the bottom
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* HEADER */}
      <View style={{ padding: 20, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Ionicons name="arrow-back" size={22} color="#502707" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("index")}>
          <Text style={{ fontWeight: "800", fontSize: 20, marginLeft: 30, color: "#502707" }}>
            STUBY
          </Text>
        </TouchableOpacity>
      </View>

      {/* MENU */}
      <View style={{ paddingHorizontal: 20 }}>
        {/* --------DASHBOARD----------- */}
        <DrawerItem
          icon="home-outline"
          label="Dashboard"
          // Navigate using the 'name' from your _layout.tsx
          onPress={() => props.navigation.navigate("index")}
        />

        {/* --------FLASHCARD----------- */}
        <DrawerItem
          icon="layers-outline"
          label="Flashcard"
          // Navigate using the 'name' from your _layout.tsx
          onPress={() => props.navigation.navigate("flashcard")}
        />

        {/* --------POMODORO----------- */}
        <DrawerItem
          icon="timer-outline"
          label="Pomodoro"
          onPress={() => props.navigation.navigate("pomodoro")}
        />

        {/* --------NOTEPAD----------- */}
        <DrawerItem
          icon="book-outline"
          label="Notepad"
          // Navigate using the 'name' from your _layout.tsx
          onPress={() => props.navigation.navigate("notepad")}
        />

        {/* --------MUSIC----------- */}
        <DrawerItem
          icon="musical-notes-outline"
          label="Music"
          // Navigate using the 'name' from your _layout.tsx
          onPress={() => props.navigation.navigate("music")}
        />

        {/* --------TODO LIST----------- */}
        <DrawerItem
          icon="list-outline"
          label="To Do List"
          onPress={() => props.navigation.navigate("todolist")}
        />
      </View>

      {/* FOOTER */}
      <View
        style={{ marginTop: "auto", padding: 20, borderTopWidth: 1, borderTopColor: "#f0f0f0" }}
      >
        <DrawerItem icon="bug-outline" label="Report a Bug" onPress={() => {}} />
        <DrawerItem
          icon="person-outline"
          label="Profile"
          // Profile is outside the drawer, so router.push is correct here
          // But remove the "(tabs)" from the path
          onPress={() => router.push("/profile")}
        />
        <DrawerItem
          icon="log-out-outline"
          label="Logout"
          onPress={() => router.replace("/(auth)/login")}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerItem({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
      }}
    >
      <Ionicons name={icon} size={22} color="#555" />
      <Text style={{ marginLeft: 14, fontSize: 15, fontWeight: "600", color: "#444" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
