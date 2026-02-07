import Images from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppHeader from "../../../components/AppHeader";

export default function EditNoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // State initialized with incoming params
  const [title, setTitle] = useState((params.title as string) || "");
  const [content, setContent] = useState((params.content as string) || "");
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdate = () => {
    // TODO: Add your Update Database/Global State logic here
    console.log("Updating note:", { id: params.id, title, content });
    router.back();
  };

  const handleDelete = () => {
    // TODO: Add your Delete Database/Global State logic here
    setShowDeleteModal(false);
    router.back();
  };

  return (
    <ImageBackground source={Images.notepadBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      <View className="flex-1">
        {/* Header Row */}
        <View className="flex-row items-center justify-between px-5 mt-4 mb-4">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={() => router.back()} className="mr-2">
              <Ionicons name="chevron-back" size={35} color="#FDE6B1" />
            </TouchableOpacity>

            <TextInput
              placeholder="Enter Title"
              placeholderTextColor="rgba(253, 230, 177, 0.5)"
              value={title}
              onChangeText={setTitle}
              className="text-[#FDE6B1] text-3xl font-[900] tracking-wider uppercase flex-1"
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.4)",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 4,
              }}
            />
          </View>

          {/* UPDATE Button */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={handleUpdate}
              className="bg-[#7ED992] px-4 py-1.5 rounded-2xl shadow-md"
            >
              <Text className="text-[#1D1D1D] font-black uppercase text-xs">Update</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Paper Note Area */}
        <View className="flex-1 mx-5 mb-10 bg-[#FFF9E3] rounded-[40px] shadow-2xl p-6">
          <TextInput
            multiline
            placeholder="Start writing..."
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
            className="flex-1 text-[#502707] text-[18px] font-medium leading-7"
          />
        </View>
      </View>
    </ImageBackground>
  );
}
