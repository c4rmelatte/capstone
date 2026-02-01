// app/(tabs)/dashboard/_layout.tsx
import CustomDrawer from "@/components/CustomDrawer";
import { Drawer } from "expo-router/drawer";

export default function DashboardLayout() {
  return (
    <Drawer
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {/* Name must match the relative file path */}
      <Drawer.Screen name="index" />
      <Drawer.Screen name="flashcard" />
      <Drawer.Screen name="pomodoro" />
      <Drawer.Screen name="notepad" />
      <Drawer.Screen name="music" />
      <Drawer.Screen name="todolist" />
    </Drawer>
  );
}
