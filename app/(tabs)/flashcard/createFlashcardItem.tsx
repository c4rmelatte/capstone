import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router } from "expo-router";
import Images from "@/constants/images";
import GreenButton from "@/components/GreenButton";
import AddFloatingButton from "@/components/AddFloatingButton";

const CreateFlashcardItem = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSave = () => {
    console.log("Saved Flashcard:", { question, answer });
    Alert.alert("Saved", "Flashcard saved successfully!");
  };

  const handleAddFlashcardItem = () => {
    console.log("Flashcard Added:", { question, answer });
    Alert.alert("Added", "Flashcard added successfully!");
    setQuestion("");
    setAnswer("");
  };

  return (
    <ImageBackground
      source={Images.FlashcardBg}
      resizeMode="cover"
      className="flex-1"
    >
      {/* DISMISS KEYBOARD ON TAP */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          {/* TOP CONTROLS */}
          <View className="absolute top-10 left-0 right-0 z-10 px-4">
            {/* BACK BUTTON */}
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-2xl mt-9 font-bold text-white">{`<`}</Text>
            </TouchableOpacity>

            {/* SAVE BUTTON */}
            <View className="mt-3 flex-row justify-end">
              <GreenButton
                title="Save"
                onPress={handleSave}
                widthPercent={0.25}
                heightPercent={0.05}
              />
            </View>
          </View>

          {/* MAIN CONTENT */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-center items-center"
          >
            {/* FLASHCARD */}
            <View className="h-[50%] w-[90%] rounded-2xl overflow-hidden shadow-lg">
              {/* QUESTION */}
              <View className="h-[65%] bg-[#39675F] px-4 py-4">
                <Text className="text-white text-3xl font-bold mb-2">
                  Question
                </Text>
                <TextInput
                  value={question}
                  onChangeText={setQuestion}
                  placeholder="Type your question here..."
                  placeholderTextColor="#9C8A5D"
                  multiline
                  textAlignVertical="top"
                  className="
                    flex-1
                    bg-[#FFF9E5]
                    text-[#553A00]
                    text-base
                    font-semibold
                    rounded-xl
                    p-4
                  "
                />
              </View>

              {/* ANSWER */}
              <View className="h-[35%] bg-[#FFF9E5] px-4 py-3">
                <Text className="text-[#39675F] text-3xl font-bold mb-1">
                  Answer
                </Text>
                <TextInput
                  value={answer}
                  onChangeText={setAnswer}
                  placeholder="Type your answer here..."
                  placeholderTextColor="#CFE9E4"
                  multiline
                  textAlignVertical="top"
                  className="
                    flex-1
                    bg-[#79D0C1]
                    text-[#083D36]
                    text-sm
                    font-semibold
                    rounded-xl
                    p-3
                  "
                />
              </View>
            </View>
          </KeyboardAvoidingView>

          {/* FLOATING ADD BUTTON */}
          <AddFloatingButton onPress={handleAddFlashcardItem} />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default CreateFlashcardItem;
