import AddFloatingButton from "@/components/AddFloatingButton";
import Images from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AppHeader from "../../../components/AppHeader";

import { FlatList, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";

const NOTES_DATA = [
  {
    id: "1",
    title: "SCIENCE",
    content: "Study of the natural world through observation & experiments....",
  },
  {
    id: "2",
    title: "MAPEH",
    content: "Music: Elements – melody, rhythm, harmony, dynamics, tempo, timbre....",
  },
  {
    id: "3",
    title: "FILIPINO",
    content: "Wika – Sistema ng komunikasyon gamit ang mga salita at simbolo....",
  },
  {
    id: "4",
    title: "ENGLISH",
    content: "Parts of Speech – Noun, Pronoun, Verb, Adjective, Adverb, Preposition....",
  },
  {
    id: "5",
    title: "SOCIAL STUDIES",
    content:
      "Philippine History – Pre-colonial, Spanish colonization, American period, Japanese occupation, Post-independence....",
  },
];

export default function NotepadScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredNotes = NOTES_DATA.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  // This is where the add note navigation
  const renderNote = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`px-6 py-5 border-b border-[#D3CBB4] ${index === 0 ? "rounded-t-[30px]" : ""}`}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/notepad/addnote",
          params: {
            id: item.id,
            title: item.title,
            content: item.content,
            mode: "edit",
          },
        })
      }
    >
      <Text className="text-[#502707] text-lg font-extrabold tracking-tight uppercase">
        {item.title}
      </Text>
      <Text className="text-[#A8947D] text-xs font-medium leading-4 mt-1" numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={Images.notepadBg} className="flex-1" resizeMode="cover">
      <AppHeader />
      <View className="flex-1">
        {/* Section Title */}
        <View className="mt-6 mb-4">
          <Text
            className="text-[#FDE6B1] text-4xl font-[900] text-center tracking-[4px]"
            style={{
              textShadowColor: "rgba(0, 0, 0, 0.4)",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            }}
          >
            NOTEPAD
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mx-6 mb-6">
          <View className="flex-row items-center border-2 border-[#FDE6B1]/60 rounded-full px-4 h-12 bg-black/10">
            <TextInput
              className="flex-1 text-white text-base"
              placeholder="Search notes..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={search}
              onChangeText={setSearch}
            />
            <Ionicons name="search" size={20} color="#FDE6B1" />
          </View>
        </View>

        {/* Note List Container */}
        <View className="flex-1 mx-6 mb-4 bg-[#FFF9E3] rounded-[30px] overflow-hidden shadow-xl">
          <FlatList
            data={filteredNotes}
            keyExtractor={(item) => item.id}
            renderItem={renderNote}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>

        {/* Floating Action Button (FAB) */}
        <AddFloatingButton onPress={() => router.push("/(tabs)/notepad/addnote")} />
      </View>
    </ImageBackground>
  );
}
