import React, { useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import GreenButton from "@/components/GreenButton";
import { router } from "expo-router";

const CreateFlashcardFolder = () => {
  const [folderTitle, setFolderTitle] = useState("");

  const handleSave = () => {
    if (!folderTitle.trim()) {
      alert("Please enter a folder title.");
      return;
    }

    // Here you can handle saving the folder (e.g., API call or state update)
    console.log("Folder saved:", folderTitle);
    router.back(); // go back to previous screen
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white px-6 pt-16"
    >
      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-2xl font-bold mr-4">{`<`}</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Flashcard</Text>
      </View>

      {/* Folder Title Input */}
      <Text className="text-base font-semibold mb-2">Folder Title</Text>
      <CustomTextInput
        placeholder="Enter folder title"
        value={folderTitle}
        onChangeText={setFolderTitle}
      />

      {/* Save Button */}
      <View className="mt-6">
        <GreenButton title="Save" onPress={handleSave} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateFlashcardFolder;
