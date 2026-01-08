import { Stack } from "expo-router";
import React from "react";

export default function FavouriteLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
