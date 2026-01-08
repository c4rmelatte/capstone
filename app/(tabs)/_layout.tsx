import { Tabs } from "expo-router";
import { Heart, Home, ShoppingCart, User } from "lucide-react-native";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarIcon: ({ focused }) => {
          let icon;

          switch (route.name) {
            case "home":
              icon = <Home size={26} color={focused ? "#000000" : "#B0B0B0"} />;
              break;
            case "cart":
              icon = <ShoppingCart size={26} color={focused ? "#5DCCFC" : "#B0B0B0"} />;
              break;
            case "favourite":
              icon = <Heart size={26} color={focused ? "#5DCCFC" : "#B0B0B0"} />;
              break;
            case "profile":
              icon = <User size={26} color={focused ? "#5DCCFC" : "#B0B0B0"} />;
              break;
          }

          return (
            <View className="items-center">
              {icon}
              {focused && <View className="w-2 h-2 bg-pure-blue rounded-full mt-1" />}
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="favourite" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
