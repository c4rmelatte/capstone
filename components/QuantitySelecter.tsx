import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <View className="flex-row items-center  border-gray-300 rounded-lg overflow-hidden">
      {/* Decrease button */}
      <TouchableOpacity
        onPress={onDecrease}
        className="px-4 py-2 bg-gray-100 items-center justify-center rounded-lg"
      >
        <Text className="text-lg font-bold">-</Text>
      </TouchableOpacity>

      {/* Quantity */}
      <View className="px-6 py-2 bg-white items-center justify-center">
        <Text className="text-lg font-semibold">{quantity}</Text>
      </View>

      {/* Increase button */}
      <TouchableOpacity
        onPress={onIncrease}
        className="px-4 py-2 bg-gray-100 items-center justify-center rounded-lg"
      >
        <Text className="text-lg font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;
