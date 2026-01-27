import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from "react-native";
import Images from "@/constants/images";

const { width } = Dimensions.get("window");

const CreateFlashcardItem = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSave = () => {
    console.log("Saved Flashcard:", { question, answer });
    // Add your save logic here
  };

  return (
    <ImageBackground
      source={Images.FlashcardBg}
      resizeMode="cover"
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}>
        {/* Flashcard Container */}
        <View
          style={{ width: width * 0.9, height: 220 }}
          className="overflow-hidden rounded-2xl shadow-md"
        >
          {/* Top 70% Green */}
          <View className="h-[70%] w-full bg-[#39675F] flex justify-center items-center px-4">
            <View className="w-full h-full bg-[#39675F] rounded-xl p-3 justify-center">
              <Text className="text-white text-lg font-bold mb-2">Question</Text>
              <TextInput
                value={question}
                onChangeText={setQuestion}
                placeholder="Type your question here..."
                placeholderTextColor="#FFF9E5"
                className="text-[#FFF9E5] text-xl font-bold"
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#FFF9E5",
                  borderRadius: 10,
                  padding: 8,
                  textAlignVertical: "top",
                  textAlign: "left",
                }}
                multiline
              />
            </View>
          </View>

          {/* Bottom 30% Yellow */}
          <View className="h-[30%] w-full bg-[#FFF9E5] flex justify-center items-center px-4">
            <View className="w-full h-full bg-[#FFF9E5] rounded-xl p-3 justify-center">
              <Text className="text-[#39675F] text-base font-bold mb-1">Answer</Text>
              <TextInput
                value={answer}
                onChangeText={setAnswer}
                placeholder="Type your answer here..."
                placeholderTextColor="#79D0C1"
                className="text-[#79D0C1] text-base font-semibold"
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#79D0C1",
                  borderRadius: 10,
                  padding: 8,
                  textAlignVertical: "top",
                  textAlign: "left",
                }}
                multiline
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          className="bg-[#39675F] rounded-xl py-3 px-6 mt-6"
        >
          <Text className="text-white font-bold text-lg text-center">Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default CreateFlashcardItem;
