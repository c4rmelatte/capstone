import GreenButton from "@/components/GreenButton";
import Images from "@/constants/images";
import { router } from "expo-router";
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
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const CreateFlashcardFolder = () => {
  const [title, setTitle] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);

  // 🎨 PICK IMAGE
  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  // ✅ CREATE FOLDER AND SEND BACK TO INDEX
  const handleCreate = () => {
    if (!title.trim()) {
      alert("Please enter a flashcard title.");
      return;
    }

    // Generate a unique ID for this folder
    const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000);
router.replace({
  pathname: "/flashcard",
  params: {
    id: uniqueId,
    title: title,
    coverPhoto: coverPhoto ?? "",
  },
});

  };

  return (
    <ImageBackground
      source={Images.FlashcardBg}
      resizeMode="cover"
      className="flex-1"
      key={`background-Flashcard-${Date.now()}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        style={{
          paddingHorizontal: width * 0.06,
          paddingTop: height * 0.1,
        }}
        key={`keyboard-Flashcard-${Date.now()}`}
      >
        {/* HEADER */}
        <View
          style={{ marginBottom: height * 0.05 }}
          className="flex-row items-center justify-center relative"
          key={`header-Flashcard-${Date.now()}`}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0"
            key={`back-button-Flashcard-${Date.now()}`}
          >
            <Text className="text-2xl font-bold">{`<`}</Text>
          </TouchableOpacity>

          <Text className="text-2xl font-bold" key={`title-Flashcard-${Date.now()}`}>
            Flashcard
          </Text>
        </View>

        {/* ADD COVER PHOTO */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={pickImage}
          style={{
            height: height * 0.24,
            marginBottom: height * 0.04,
          }}
          className="w-full rounded-2xl bg-gray-400/80 overflow-hidden items-center justify-center"
          key={`cover-photo-Flashcard-${Date.now()}`}
        >
          {coverPhoto ? (
            <Image
              source={{ uri: coverPhoto }}
              resizeMode="cover"
              className="w-full h-full"
              key={`image-Flashcard-${Date.now()}`}
            />
          ) : (
            <>
              <View
                className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center"
                key={`plus-icon-Flashcard-${Date.now()}`}
              >
                <Feather name="plus" size={24} color="#555" />
              </View>
              <Text
                className="mt-3 font-semibold text-white"
                key={`add-text-Flashcard-${Date.now()}`}
              >
                Add Cover Photo
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* FLASHCARD TITLE */}
        <Text
          style={{ marginBottom: height * 0.01 }}
          className="text-base font-semibold text-black"
          key={`label-Flashcard-${Date.now()}`}
        >
          Flashcard Title
        </Text>

        {/* TEXT INPUT */}
        <View
          style={{ height: height * 0.06 }}
          className="bg-white rounded-full border-2 border-black px-5 justify-center"
          key={`input-Flashcard-${Date.now()}`}
        >
          <TextInput
            value={title}
            onChangeText={setTitle}
            className="font-bold text-base text-black"
            key={`textinput-Flashcard-${Date.now()}`}
          />
        </View>

        {/* CREATE BUTTON */}
        <View
          style={{ marginTop: height * 0.03 }}
          className="flex-row justify-end"
          key={`button-row-Flashcard-${Date.now()}`}
        >
          <GreenButton
            title="Create"
            onPress={handleCreate}
            widthPercent={0.25}
            heightPercent={0.05}
            key={`create-button-Flashcard-${Date.now()}`}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default CreateFlashcardFolder;
