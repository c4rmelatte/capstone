import React from "react";
import { View, Text, Dimensions } from "react-native";
import AddFloatingButton from "@/components/AddFloatingButton";

const { width } = Dimensions.get("window");

const FlashCard = () => {
  return (
    <View className="flex-1 items-center mt-20">
      <Text className="text-2xl font-bold mb-6">FlashCard Screen</Text>
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


<AddFloatingButton onPress={() => {}} />

    </View>
  );
};

export default FlashCard;
