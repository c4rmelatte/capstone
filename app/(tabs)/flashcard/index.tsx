import React from "react";
import { View, Text, Dimensions, ImageBackground } from "react-native";
import AddFloatingButton from "@/components/AddFloatingButton";
import Images from "@/constants/images";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const FlashCard = () => {
  return (
    <ImageBackground
      source={Images.FlashcardBg} // make sure this is defined in Images
      resizeMode="cover"
      className="flex-1 items-center pt-20"
    >
      <Text
        className="text-2xl font-bold mb-6 text-white"
        style={{
          textShadowColor: "#000000",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 2,
        }}
      >
        FlashCard Screen
      </Text>

      <View
        className="overflow-hidden rounded-2xl shadow-md"
        style={{ width: width * 0.9, height: 180 }}
      >
        {/* Top 20% */}
        <View className="flex-[2] bg-[#39675F]" />

        {/* Bottom 80% */}
        <View className="flex-[8] bg-[#FFF9E5] items-center justify-center px-4">
          <Text className="text-base text-black">FlashCard Content</Text>
        </View>
      </View>

      {/* Floating Button */}
      <AddFloatingButton
        onPress={() => router.push("/flashcard/createFlashcardFolder")}
      />
    </ImageBackground>
  );
};

export default FlashCard;
