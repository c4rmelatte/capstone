import Images from "@/constants/images";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import MiniToggle from "./MiniToggle";

const PromoCard = () => {
  const [isSwapped, setIsSwapped] = useState(false);
  const [isActive, setIsActive] = useState(true);

  return (
    <View className="mt-6 px-3">
      {/* Promo Image */}
      <ImageBackground
        source={Images.Banner}
        className="w-full h-[141px] rounded-2xl overflow-hidden px-5 py-3"
        resizeMode="cover"
      >
        {/* Dark transparent overlay */}
        <View className="absolute inset-0 bg-black/40" />
        <View className="flex-1 justify-between">
          {/* Swappable Texts (top-left) */}
          <View>
            {!isSwapped ? (
              <>
                <Text className="text-white text-lg font-semibold">Bottle Water Delivery</Text>
                <Text className="text-white text-base mt-1">Drips Springs</Text>
              </>
            ) : (
              <>
                <Text className="text-white text-lg font-semibold">Drips Springs</Text>
                <Text className="text-white text-base mt-1">Bottle Water Delivery</Text>
              </>
            )}
          </View>

          {/* Button (bottom-right) */}
          <View className="items-end">
            <TouchableOpacity className="bg-[#FFC33A] w-[91px] h-[25px] rounded-md items-center justify-center shadow-md">
              <Text className="text-black font-semibold text-sm">Quick Shop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Toggle Control */}
      <View className="flex-row justify-center items-center mt-3">
        <MiniToggle isActive={isSwapped} onToggle={() => setIsSwapped(!isSwapped)} />
      </View>
    </View>
  );
};

export default PromoCard;
