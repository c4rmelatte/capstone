import React from "react";
import { Text, Image, View, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Images from "@/constants/images";

const { height, width } = Dimensions.get("window");

// Optional responsive font scaling
const scaleFont = (size: number) => (size * width) / 375;

export default function ToDoIntroduction() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FFF9E5]">

      {/* Top Section */}
      <View className="w-full relative" style={{ height: height * 0.7 }}>
        <Image
          source={Images.ToDoWaveBg}
          resizeMode="stretch"
          className="absolute top-0 left-0 w-full h-full"
        />

        <View
          className="flex-1 justify-center items-center z-10"
          style={{ marginBottom: height * 0.1 }}
        >
          <Image
            source={Images.TaskReady}
            resizeMode="contain"
            style={{ width: width * 0.9, height: width * 0.9 }}
          />
        </View>
      </View>

      {/* Bottom Section */}
      <View className="flex-1 px-6 justify-start">
        <Text
          className="font-semibold text-black mb-3"
          style={{ fontSize: scaleFont(30) }}
        >
          Task Ready
        </Text>

        <Text
          className="text-black text-justify"
          style={{
            fontSize: scaleFont(18),
            lineHeight: scaleFont(24),
          }}
        >
          Organize your tasks and track your progress with ease.
          Stay on top of your goals every day!
        </Text>
      </View>

    </View>
  );
}
