import AppHeader from "@/components/AppHeader";
import Images from "@/constants/images";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ImageBackground, View } from "react-native";

// constants
const name = "Nina Carmela";
const username = "ninacarmela";
const profileImage = Images.FocusBeats;

const EditProfile = () => {
  return (
    <ImageBackground source={Images.ProfileBg} className="flex-1">
      <StatusBar style="light" />
      <AppHeader />

      {/* profile section */}
      <View className="items-center" style={{ paddingHorizontal: "6%", marginTop: "12%" }}>
        {/* profile image */}
        <View className="border-4 border-[#502707] rounded-full p-1 overflow-hidden">
          <Image
            source={profileImage}
            className="rounded-full"
            resizeMode="cover"
            style={{ width: "48%", height: undefined, aspectRatio: 1 }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default EditProfile;
