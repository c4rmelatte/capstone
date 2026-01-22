import React from "react";
import { Text, Image, View, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Images from "@/constants/images";

const { height, width } = Dimensions.get("window");

// Optional font scaling
const scaleFont = (size: number) => (size * width) / 375;

export default function WelcomeIntroduction() {
  const router = useRouter();

  const handleNextPage = () => {
    router.push("/introduction/introductionFlow");
  };

  return (
    <View className="flex-1 bg-[#7abbaf]">

      {/* Top Section */}
      <View className="w-full relative" style={{ height: height * 0.7 }}>
        <Image
          source={Images.YellowWaveIntro}
          resizeMode="stretch"
          className="absolute top-0 left-0 w-full h-full"
        />

        <View className="flex-1 justify-center items-center z-10" style={{ marginBottom: height * 0.1 }}>
          <Image
            source={Images.StubyLogo}
            resizeMode="contain"
            style={{ width: width * 0.9, height: width * 0.9 }}
          />
        </View>
      </View>

      {/* Bottom Section */}
      <View
        className="w-full justify-end px-6"
        style={{ height: height * 0.29, paddingBottom: height * 0.05 }}
      >
        <View className="mb-6">
          <Text
            className="text-white font-semibold mb-3"
            style={{ fontSize: scaleFont(30) }}
          >
            WELCOME
          </Text>

          <Text
            className="text-white text-justify"
            style={{
              fontSize: scaleFont(18),
              lineHeight: scaleFont(24),
            }}
          >
            Welcome to STUBY – your smart study buddy for better learning.
            Whether you're prepping for exams, organizing notes, or exploring
            new techniques, STUBY brings it all together in one simple app.
            Let’s start your journey to better study habits today!
          </Text>
        </View>

        <CustomButton
          title="Go to Next"
          onPress={handleNextPage}
        />
      </View>

    </View>
  );
}
