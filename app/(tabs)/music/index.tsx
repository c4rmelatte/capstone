  import Images from "@/constants/images";
  import { Ionicons } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
  import React, { useState } from "react";
  import AppHeader from "../../../components/AppHeader";

  import {
    FlatList,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";

  const MUSIC_DATA = [
    { id: "1", title: "Classical", liked: true },
    { id: "2", title: "Upbeat", liked: false },
    { id: "3", title: "Pop", liked: false },
    { id: "4", title: "Nature", liked: false },
    { id: "5", title: "Lofi", liked: false },
  ];

  export default function MusicScreen() {
    const router = useRouter();
    const [music, setMusic] = useState(MUSIC_DATA);

    const toggleLike = (id: string) => {
      setMusic((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, liked: !item.liked } : item
        )
      );
    };

    const renderItem = ({ item }: { item: any }) => (
      <View className="mb-4 rounded-2xl bg-[#4C5C8A]/90 px-5 py-4 shadow-lg">
        {/* Top Row */}
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-xl font-extrabold tracking-wide">
            {item.title}
          </Text>

          <Ionicons name="ellipsis-horizontal" size={20} color="white" />
        </View>

        {/* Sub text */}
        <Text className="text-white/70 text-xs mt-1">
          20 songs · 45 min 15 s
        </Text>

        {/* Action Row */}
        <View className="flex-row items-center justify-end mt-3 space-x-4">
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Ionicons
              name={item.liked ? "heart" : "heart-outline"}
              size={22}
              color={item.liked ? "#FF6B6B" : "white"}
            />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-full p-2">
            <Ionicons name="play" size={18} color="#4C5C8A" />
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <ImageBackground source={Images.MusicWaveBg} className="flex-1" resizeMode="cover">
        <AppHeader />

        <SafeAreaView className="flex-1">
          {/* Title */}
          <View className="mt-6 mb-6">
            <Text
              className="text-[#2E2A25] text-4xl font-[900] text-center tracking-[4px]"
              style={{
                textShadowColor: "rgba(0,0,0,0.25)",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 4,
              }}
            >
              MUSIC
            </Text>
          </View>

          {/* List */}
          <View className="flex-1 mx-6">
            <FlatList
              data={music}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
            />
          </View>

          {/* FAB */}
          <TouchableOpacity
            activeOpacity={0.9}
            className="absolute bottom-8 right-8 w-[65px] h-[65px] bg-[#EFE2B6] rounded-full justify-center items-center shadow-xl"
            onPress={() => router.push("/(tabs)/music/addmusic")}
          >
            <Ionicons name="add" size={40} color="#2E2A25" />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  }
