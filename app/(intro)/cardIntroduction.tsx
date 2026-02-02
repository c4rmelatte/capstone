import React from "react";
import { Text, Image, View, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Images from "@/constants/images";

const { height, width } = Dimensions.get("window");

export default function CardIntroduction() {
  const router = useRouter();

  const LOGO_WIDTH = width * 0.9;

  return (
    <View className="flex-1 bg-[#FFF9E5]">

      {/* Top Part - Yellow Wave + Logo */}
      <View className="w-full relative" style={{ height: height * 0.7 }}>
        <Image 
          source={Images.FlashcardWaveBg}
          className="absolute top-0 left-0 w-full h-full"
          resizeMode="stretch"
        />

        <View 
          className="flex-1 justify-center items-center"
          style={{ marginBottom: height * 0.1 }}
        >
          <Image
            source={Images.FlashLearn}
            style={{ width: LOGO_WIDTH, height: LOGO_WIDTH }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Part - Text + Button */}
      <View 
        className="flex-1 justify-start px-[6%]"
      >
        <Text 
          className="text-black font-semibold mb-[1.5%]" 
          style={{ fontSize: (30 * width) / 375 }}
        >
          Flash & Learn
        </Text>
        <Text
          className="text-black text-justify"
          style={{ fontSize: (18 * width) / 375, lineHeight: (24 * width) / 375 }}
        >
          Turn your lessons into quick, easy-to-review cards. Master concepts faster and smarter!
        </Text>

        {/* Example button usage */}
        {/* <View className="items-center mt-4">
          <YellowButton title="Get Started" onPress={() => router.push("/next")} />
        </View> */}
      </View>

    </View>
  );
}
