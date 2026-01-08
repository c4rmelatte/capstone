import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const SearchBox = () => {
  return (
    <View className="flex-row items-center bg-[rgba(0,0,0,0.1)] rounded-xl px-4 py-2">
      <TextInput
        placeholder="Search Something..."
        placeholderTextColor="#fff"
        className="flex-1 text-base text-black h-[40px]"
      />
      <TouchableOpacity>
        <Ionicons name="search" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
