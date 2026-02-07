import { AuthProvider } from "@/context/AuthContext";
import { WaterProvider } from "@/context/WaterContext";
import { PomodoroProvider } from "@/context/PomodoroContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PollerOneRegular: require("../assets/fonts/PollerOne-Regular.ttf"),
    RubicItalic: require("../assets/fonts/Rubik-Italic-VariableFont_wght.ttf"),
    RubicVarient: require("../assets/fonts/Rubik-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <WaterProvider>
        <PomodoroProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </PomodoroProvider>
      </WaterProvider>
    </AuthProvider>
  );
}
