import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Images from "@/constants/images";
import { ChevronLeft } from "lucide-react-native";
import GreenButton from "@/components/GreenButton";
import AppHeader from "@/components/AppHeader";

const UpdateFlashcardItem = () => {
  const { id } = useLocalSearchParams();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleUpdate = () => {
    console.log("Updated Flashcard:", { id, question, answer });
    Alert.alert("Updated", "Flashcard updated successfully!");
    router.back();
  };

  return (
    <ImageBackground source={Images.FlashcardBg} resizeMode="cover" className="flex-1">
      <AppHeader />
      {/* DISMISS KEYBOARD ON TAP */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 mt-4">
          {/* TOP CONTROLS */}
          <View className="flex flex-row items-center justify-between left-0 right-0 z-10 px-4">
            {/* Back button */}
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={28} color="#ffffff" />
            </TouchableOpacity>

            {/* Update button */}
            <GreenButton
              title="Update"
              onPress={handleUpdate}
              widthPercent={0.25}
              heightPercent={0.05}
            />
          </View>

          {/* MAIN CONTENT */}
          <View 
            className="flex-1 items-center"
            style={{ marginTop: "40%" }}
          >
            {/* FLASHCARD */}
            <View className="h-[50%] w-[90%] rounded-2xl overflow-hidden shadow-lg">
              {/* QUESTION */}
              <View className="h-[65%] bg-[#39675F] px-4 py-4">
                <Text className="text-white text-3xl font-bold mb-2">Question</Text>
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
                <Text className="text-[#39675F] text-3xl font-bold mb-1">Answer</Text>
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default UpdateFlashcardItem;
