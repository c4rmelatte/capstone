import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface SizeDropdownProps {
  sizes?: string[];
  selectedSize?: string;
  onSelect: (size: string) => void;
}

const SizeDropdown: React.FC<SizeDropdownProps> = ({
  sizes = ["50 ml", "100 ml", "500 ml", "1000 ml", "2000 ml"],
  selectedSize,
  onSelect,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (size: string) => {
    onSelect(size);
    setIsVisible(false);
  };

  return (
    <View>
      {/* Main Dropdown Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsVisible(true)}
        className="flex-row justify-between items-center border-2 rounded-lg "
        style={{ borderColor: "#3FBDF1" }}
      >
        <Text className="text-gray-800 text-base px-4 py-3">{selectedSize || "Select size"}</Text>
        <View className="bg-[#3FBDF1] w-10 h-12 rounded-lg rounded-br-lg items-center justify-center  ">
          <ChevronDown size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Modal for Dropdown List */}
      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
          className="flex-1 justify-center items-center bg-black/30"
        >
          <View className="bg-white w-64 rounded-lg border-2" style={{ borderColor: "#3FBDF1" }}>
            <FlatList
              data={sizes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  className="py-3 px-5 border-b border-gray-100"
                >
                  <Text className="text-gray-800 text-base">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SizeDropdown;
