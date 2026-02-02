import Images from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    Modal,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import AppHeader from "../../../components/AppHeader";

export default function AddNoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (params.title) setTitle(params.title as string);
    if (params.content) setContent(params.content as string);
  }, [params]);

  const handleDelete = () => {
    // Basic delete logic
    setShowDeleteModal(false);
    router.back();
  };

  return (
    <ImageBackground source={Images.notepadBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      <SafeAreaView className="flex-1">
        {/* Header Row */}
        <View className="flex-row items-center justify-between px-5 mt-4 mb-4">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={() => router.back()} className="mr-2">
              <Ionicons name="chevron-back" size={35} color="#FDE6B1" />
            </TouchableOpacity>

            <TextInput
              placeholder="ENTER TITLE"
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

          {/* Conditional Header: Dots for existing notes, Save for new ones */}
          {params.mode === "edit" ? (
            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
              <Ionicons name="ellipsis-horizontal" size={30} color="#FDE6B1" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-[#7ED992] px-5 py-1.5 rounded-2xl shadow-md"
              onPress={() => router.back()}
            >
              <Text className="text-[#1D1D1D] font-black">Save</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Dropdown Menu */}
        {showMenu && (
          <View className="absolute right-6 top-16 bg-white rounded-2xl p-2 z-50 shadow-xl w-32 border border-gray-200">
            <TouchableOpacity className="flex-row items-center p-2 border-b border-gray-100">
              <Ionicons name="create-outline" size={18} color="#4A90E2" />
              <Text className="ml-2 font-bold text-gray-800">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center p-2"
              onPress={() => {
                setShowMenu(false);
                setShowDeleteModal(true);
              }}
            >
              <Ionicons name="trash-outline" size={18} color="#FF5A5F" />
              <Text className="ml-2 font-bold text-gray-800">Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Delete Modal */}
        <Modal transparent visible={showDeleteModal} animationType="fade">
          <Pressable className="flex-1 bg-black/60 justify-center items-center px-10">
            <View className="bg-[#6B728E] w-full rounded-[30px] p-6 shadow-2xl">
              <Text className="text-center text-white text-2xl font-black mb-2">Delete Notes</Text>
              <Text className="text-center text-gray-200 text-sm mb-4">
                Are you sure you want to delete this note?
              </Text>

              <View className="bg-[#3D435C] rounded-xl p-3 flex-row items-start mb-6">
                <Ionicons name="warning-outline" size={20} color="#FDE6B1" />
                <View className="ml-2 flex-1">
                  <Text className="text-[#FDE6B1] font-bold text-xs">WARNING!</Text>
                  <Text className="text-gray-300 text-[10px]">
                    once deleted, you will no longer retrieve this note.
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-center gap-4">
                <TouchableOpacity
                  onPress={handleDelete}
                  className="bg-[#FF5A5F] px-8 py-2 rounded-full"
                >
                  <Text className="text-white font-black">Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowDeleteModal(false)}
                  className="bg-white px-8 py-2 rounded-full"
                >
                  <Text className="text-[#3D435C] font-black">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>

        {/* Paper Note Area */}
        <View className="flex-1 mx-5 mb-10 bg-[#FFF9E3] rounded-[40px] shadow-2xl p-6">
          <TextInput
            multiline
            placeholder="Enter notes......."
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
            className="flex-1 text-[#502707] text-[18px] font-medium leading-7"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
