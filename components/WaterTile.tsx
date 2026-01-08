import Images from "@/constants/images";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { ImageSourcePropType } from "react-native";

interface WaterTileProps {
  name: string;
  price: string;
  image: string | ImageSourcePropType;
}

const WaterTile: React.FC<WaterTileProps> = ({ name, price, image }) => {
  const [liked, setLiked] = useState(false);

  // Convert string URLs to the required ImageSourcePropType { uri: string }
  const imageSource = Images[image as keyof typeof Images];

  return (
    <View className="flex-1 m-2 bg-white rounded-lg overflow-hidden shadow">
      {/* Image with heart icon */}
      <View className="relative">
        <Image source={imageSource} className="w-full h-40" resizeMode="cover" />
        <TouchableOpacity
          onPress={() => setLiked(!liked)}
          className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-md items-center justify-center"
        >
          <AntDesign name="heart" size={20} color={liked ? "red" : "gray"} />
        </TouchableOpacity>
      </View>

      {/* Name & Price */}
      <View className="p-2">
        <Text className="text-base font-semibold">{name}</Text>
        <Text className="text-sm text-gray-600">${price}</Text>
      </View>
    </View>
  );
};

export default WaterTile;
