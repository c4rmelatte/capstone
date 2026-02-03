

import { 
  Image, 
  ImageBackground, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  View, 
  Dimensions 
} from "react-native";
import { SquarePen, Trash2 } from "lucide-react-native"; // icons
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Images from "@/constants/images";
import { router } from "expo-router";


// constants
const name = "Nina Carmela";
const username = "ninacarmela";
const profileImage = Images.FocusBeats; 
const memberSince = "August 2025";

// console log functions
  const editProfile = () => {
  router.push("/profile/editProfile")
};

  const deleteProfile = () => {
    console.log("Delete profile clicked!");
  };


const Profile = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false); // added state

  return (
  <ImageBackground source={Images.ProfileBg} className="flex-1">
    <StatusBar style="light" />
    <AppHeader />

    {/* top dots aligned right using flex */}
    <View className="flex-row justify-end px-6 mt-4 relative">
      {[0, 1, 2].map((i) => (
        <TouchableWithoutFeedback
          key={i}
          onPress={() => setIsPopupVisible(!isPopupVisible)}
        >
          <View
            className="w-2 h-2 rounded-full bg-white ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          />
        </TouchableWithoutFeedback>
      ))}

      {/* Inline Popup */}
      {isPopupVisible && (
        <View
          className="absolute top-5 right-2 bg-white rounded-lg p-2 shadow-lg"
          style={{ width: Dimensions.get("window").width * 0.32 }}
        >
          {/* Edit Button */}
          <TouchableOpacity
            className="flex-row items-center space-x-3"
            onPress={editProfile}
          >
            <SquarePen size={18} color="#85ADDA" />
            <Text className="text-black font-semibold"> Edit Profile</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity
            className="flex-row items-center space-x-3 mt-2"
            onPress={deleteProfile}
          >
            <Trash2 size={18} color="red" />
            <Text className="text-black font-semibold"> Delete Account</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>

    {/* profile section */}
    <View className="items-center" style={{ paddingHorizontal: "6%", marginTop: "8%" }}>
      {/* profile image */}
      <View className="border-4 border-[#502707] rounded-full p-1 overflow-hidden">
        <Image
          source={profileImage}
          className="rounded-full"
          resizeMode="cover"
          style={{ width: "48%", height: undefined, aspectRatio: 1 }}
        />
      </View>

      <Text className="text-xl font-semibold text-black mt-4">{name}</Text>

      <Text className="text-base text-black mt-1">@{username}</Text>

      <View className="bg-[#FFF1B8] px-4 w-[90%] h-[20%] flex justify-center pr-8 rounded-xl mt-4">
        <Text className="text-black font-semibold text-xl">Member since</Text>
        <Text className="text-[#5f5f5f] font-semibold text-xl">{memberSince}</Text>
      </View>
    </View>

    <View className="flex-1" />
  </ImageBackground>
  );
};

export default Profile;
