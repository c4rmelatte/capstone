import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import GreenButton from "@/components/GreenButton";
import AppHeader from "@/components/AppHeader";
import Images from "@/constants/images";
import { ChevronLeft } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const CreateMusicFolder = () => {
  const [musicTitle, setMusicTitle] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);

  // 🎨 PICK IMAGE
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required to access photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setCoverPhoto(result.assets[0].uri);
    }
  };

  // ✅ CREATE MUSIC FOLDER AND SEND BACK TO MUSIC SCREEN
  const handleCreate = () => {
    if (!musicTitle.trim()) {
      alert("Please enter a music folder title.");
      return;
    }

    const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000);

    router.push({
      pathname: "/(tabs)/music",
      params: {
        id: uniqueId,
        title: musicTitle,
        coverPhoto: coverPhoto ?? "",
      },
    });
  };

  return (
    <ImageBackground
      source={Images.MusicBg}
      resizeMode="cover"
      className="flex-1"
      key={`background-Music-${Date.now()}`}
    >
      <AppHeader />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        style={{ paddingHorizontal: width * 0.06 }}
        key={`keyboard-Music-${Date.now()}`}
      >
        {/* HEADER */}
        <View className="flex-row items-center mt-8 justify-center mb-12 relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0 p-2"
          >
            <ChevronLeft size={28} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-[#FDE6B1]">
            Create Music Folder
          </Text>
        </View>

        {/* ADD COVER PHOTO */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={pickImage}
          style={{ height: height * 0.14, marginBottom: height * 0.04 }}
          className="w-full rounded-2xl bg-gray-400/80 overflow-hidden items-center justify-center"
          key={`cover-photo-Music-${Date.now()}`}
        >
          {coverPhoto ? (
            <Image
              source={{ uri: coverPhoto }}
              resizeMode="cover"
              className="w-full h-full"
              key={`image-Music-${Date.now()}`}
            />
          ) : (
            <>
              <View
                className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center"
                key={`plus-icon-Music-${Date.now()}`}
              >
                <Feather name="plus" size={24} color="#555" />
              </View>
              <Text
                className="mt-3 font-semibold text-white"
                key={`add-text-Music-${Date.now()}`}
              >
                Add Cover Photo
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* MUSIC TITLE */}
        <Text
          style={{ marginBottom: height * 0.01 }}
          className="text-base font-semibold text-black"
          key={`label-Music-${Date.now()}`}
        >
          Music Folder Title
        </Text>

        {/* TEXT INPUT */}
        <View
          style={{
            height: height * 0.06,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
          className="bg-white rounded-full border-2 border-black px-4 justify-center"
          key={`input-Music-${Date.now()}`}
        >
          <TextInput
            value={musicTitle}
            onChangeText={setMusicTitle}
            className="font-bold text-black"
            key={`textinput-Music-${Date.now()}`}
          />
        </View>

        {/* CREATE BUTTON */}
        <View
          style={{ marginTop: height * 0.03 }}
          className="flex-row justify-end"
          key={`button-row-Music-${Date.now()}`}
        >
          <GreenButton
            title="Create"
            onPress={handleCreate}
            widthPercent={0.25}
            heightPercent={0.05}
            key={`create-button-Music-${Date.now()}`}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default CreateMusicFolder;
