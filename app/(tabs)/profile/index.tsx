import { useAuthContext } from "@/context/AuthContext";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const { logout, loading } = useAuthContext();
  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/welcome"); // ✅ Go back to login screen
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold">Profile</Text>
      <TouchableOpacity className="mt-4 px-4 py-2 bg-pure-blue rounded" onPress={handleLogout}>
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
