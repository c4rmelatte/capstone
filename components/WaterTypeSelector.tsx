import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface WaterTypeSelectorProps {
  selected: string;
  onSelect: (type: string) => void;
}

const waterTypes = ["All", "Distilled", "Spring", "Purified"];

const WaterTypeSelector: React.FC<WaterTypeSelectorProps> = ({ selected, onSelect }) => {
  return (
    <View className="mt-4 px-3 mb-6">
      <FlatList
        data={waterTypes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            className={`mr-3 items-center justify-center rounded-md ${
              selected === item ? "bg-[#212121]" : "bg-[#212121]/60"
            }`}
            style={{
              width: 82,
              height: 34,
            }}
          >
            <Text className="font-medium text-sm text-white">{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default WaterTypeSelector;
