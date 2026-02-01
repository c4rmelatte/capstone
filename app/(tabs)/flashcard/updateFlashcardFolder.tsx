import AppHeader from "@/components/AppHeader";
import GreenButton from "@/components/GreenButton";
import Images from "@/constants/images";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react-native";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const UpdateFlashcardFolder = () => {
  const params = useLocalSearchParams<{
    id: string;
    title?: string;
    coverPhoto?: string;
  }>();

  const [title, setTitle] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (params?.title) setTitle(params.title);
    if (params?.coverPhoto) setCoverPhoto(params.coverPhoto);
  }, [params?.id]);

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

  // ✅ UPDATE + GO BACK (NO STACKING)
  const handleUpdate = () => {
    if (!title.trim()) {
      alert("Please enter a flashcard title.");
      return;
    }

    router.push({
      pathname: "/flashcard",
      params: {
        id: params.id,
        title,
        coverPhoto: coverPhoto ?? "",
        updated: "true",
      },
    });
  };

  return (
    <ImageBackground source={Images.FlashcardBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        style={{
          paddingHorizontal: width * 0.06,
          paddingTop: height * 0.1,
        }}
      >
        <View className="flex-row items-center mt-8 justify-center mb-12 relative">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-0 p-2">
            <ChevronLeft size={28} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-[#FDE6B1]">Update Flashcard Deck</Text>
        </View>

        {/* COVER PHOTO */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={pickImage}
          style={{
            height: height * 0.24,
            marginBottom: height * 0.04,
          }}
          className="w-full rounded-2xl bg-gray-400/80 overflow-hidden items-center justify-center"
        >
          {coverPhoto ? (
            <Image source={{ uri: coverPhoto }} resizeMode="cover" className="w-full h-full" />
          ) : (
            <>
              <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
                <Feather name="plus" size={24} color="#555" />
              </View>
              <Text className="mt-3 font-semibold text-white">Add Cover Photo</Text>
            </>
          )}
        </TouchableOpacity>

        {/* TITLE LABEL */}
        <Text
          style={{ marginBottom: height * 0.01 }}
          className="text-base font-semibold text-black"
        >
          Flashcard Title
        </Text>

        {/* INPUT */}
        <View
          style={{ height: height * 0.06,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              
            }}
          className="bg-white rounded-full border-2 border-black px-4 justify-center"
        >
          <TextInput value={title} onChangeText={setTitle} className="font-bold text-black" />
        </View>

        {/* UPDATE BUTTON */}
        <View style={{ marginTop: height * 0.03 }} className="flex-row justify-end">
          <GreenButton
            title="Update"
            onPress={handleUpdate}
            widthPercent={0.25}
            heightPercent={0.05}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default UpdateFlashcardFolder;
