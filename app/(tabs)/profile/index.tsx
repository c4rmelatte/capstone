import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ImageBackground, Text, TouchableWithoutFeedback, View } from "react-native";

import AppHeader from "@/components/AppHeader";
import Images from "@/constants/images";

// constants
const ProfileImage = Images.FocusBeats; // your image asset
const MEMBER_SINCE = "August 2025";

const Profile = () => {
  return (
    <ImageBackground source={Images.ProfileBg}  className="flex-1 h-20">
      <StatusBar style="light" />
      <AppHeader />

      {/* top dots aligned right using flex */}
      <View className="flex-row justify-end px-6 mt-4">
        {[0, 1, 2].map((i) => ( 
          <TouchableWithoutFeedback key={i} onPress={() => {}}>
            <View
              className="w-2 h-2 rounded-full bg-white ml-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </TouchableWithoutFeedback>
        ))}
      </View>

      {/* profile section */}
      <View className="items-center mt-8 px-6">
        {/* profile image */}
        <View className="border-4 border-[#502707] rounded-full p-1 overflow-hidden">
          <Image source={ProfileImage} className="w-28 h-28 rounded-full" resizeMode="cover" />
        </View>

        {/* name */}
        <Text className="text-xl font-semibold text-black mt-4">Nina Carmela</Text>

        {/* username */}
        <Text className="text-base text-black mt-1">@ninacarmela</Text>

        {/* member since */}
<View className="bg-[#FFF1B8] px-4 w-[90%] h-[22%] flex justify-center pr-8 rounded-xl mt-4">
  <Text className="text-black font-semibold text-xl">
    Member since
  </Text>

  <Text className="text-[#5f5f5f] font-semibold text-xl">
    {MEMBER_SINCE}
  </Text>
</View>
      </View>

      <View className="flex-1" />
    </ImageBackground>
  );
};

export default Profile;
