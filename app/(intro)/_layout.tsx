import { Stack } from "expo-router";

export default function IntroductionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,   // removes top navigation bar
        animation: "none",    // optional, no sliding animation
      }}
    />
  );
}
