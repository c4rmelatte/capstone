import Images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Pencil } from "lucide-react-native";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../../components/AppHeader";

export default function Playlist() {
  const params = useLocalSearchParams();
  const folderId = params?.id;
  const folderTitle = params?.title ?? "Playlist";

  return (
    <ImageBackground source={Images.FlashcardBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      {/* HEADER */}
      <View className="flex-row items-center justify-between px-6 mt-7 mb-6 relative">
        <TouchableOpacity onPress={() => router.push("/(tabs)/music")}>
          <ChevronLeft size={28} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-4xl font-bold text-[#FDE6B1] text-center flex-1">{folderTitle}</Text>

        <TouchableOpacity
          onPress={() => router.push(`/music/updateMusicFolder?editId=${folderId}`)}
        >
          <Pencil size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* SONGS LIST PLACEHOLDER */}
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl">Songs will be listed here...</Text>
      </View>
    </ImageBackground>
  );
}

