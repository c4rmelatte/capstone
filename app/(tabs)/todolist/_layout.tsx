import { Stack } from "expo-router";
import React from "react";

export default function TodolistLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* This refers to index.tsx in the same folder */}
      <Stack.Screen name="index" />
    </Stack>
  );
}
