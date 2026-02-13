import AddFloatingButton from "@/components/AddFloatingButton";
import AppHeader from "@/components/AppHeader";
import Images from "@/constants/images";
import { router } from "expo-router";

import { ChevronLeft } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";

const CreateFlashcardItem = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useState(new Animated.Value(0))[0];

  const handleAddFlashcardItem = () => {
    console.log("Flashcard Added:", { question, answer });
    setQuestion("");
    setAnswer("");
    // Show toast
    setShowToast(true);
    Animated.timing(toastOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowToast(false));
      }, 2000); // Toast visible for 2 seconds
    });
  };

  return (
    <ImageBackground source={Images.FlashcardBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 mt-4">
          {/* TOP CONTROLS */}
          <View className="flex flex-row items-center justify-between left-0 right-0 z-10 px-4" style={{ marginBottom: "40%" }}>
            {/* Back button */}
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={28} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* MAIN CONTENT */}
          <View
            className="flex-1 items-center"
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

          {/* FLOATING ADD BUTTON */}
          <AddFloatingButton onPress={handleAddFlashcardItem} />

          {/* TOAST */}
          {showToast && (
            <Animated.View
              style={{
                position: "absolute",
                bottom: 50,
                alignSelf: "center",
                backgroundColor: "#39675F",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 25,
                opacity: toastOpacity,
              }}
            >
              <Text className="text-white font-semibold">Flashcard added!</Text>
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default CreateFlashcardItem;
