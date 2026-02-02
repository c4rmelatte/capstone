import React from "react";
import { View, Text, Image } from "react-native";

export default function CustomBackgroundScreen() {
  return (
    <View className="flex-1 bg-[#FFF9E6]"> {/* Top cream background */}
      
      {/* Bottom green shape */}
      <View className="absolute bottom-0 w-full h-1/2 bg-[#7ABBAF] rounded-t-[80px]" />

      {/* Content on top */}
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-white text-3xl font-bold mb-4">
          WELCOME
        </Text>
        <Text className="text-white text-base text-center">
          This is some description text that sits on top of the background.
        </Text>
      </View>

    </View>
  );
}
