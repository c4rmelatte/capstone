import GreenButton from "@/components/GreenButton";
import Images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
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
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

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

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setCoverPhoto(result.assets[0].uri);
    }
  };

  const handleUpdate = () => {
    if (!title.trim()) return;

    router.replace({
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
    <ImageBackground source={Images.FlashcardBg} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        style={{ paddingHorizontal: width * 0.06, paddingTop: height * 0.1 }}
      >
        <Text className="text-2xl font-bold text-center mb-6">
          Update Flashcard
        </Text>

        <TouchableOpacity
          onPress={pickImage}
          style={{ height: height * 0.24 }}
          className="rounded-2xl bg-gray-400 items-center justify-center mb-6"
        >
          {coverPhoto ? (
            <Image source={{ uri: coverPhoto }} className="w-full h-full" />
          ) : (
            <Feather name="plus" size={28} />
          )}
        </TouchableOpacity>

        <Text className="font-semibold mb-2">Flashcard Title</Text>

        <View className="bg-white border-2 border-black rounded-full px-5 h-14 justify-center">
          <TextInput
            value={title}
            onChangeText={setTitle}
            className="font-bold"
          />
        </View>

        <View className="flex-row justify-end mt-6">
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
