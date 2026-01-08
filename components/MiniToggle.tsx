import React from "react";
import { TouchableOpacity, View } from "react-native";

interface MiniToggleProps {
  isActive: boolean; // true → dark on left, false → dark on right
  onToggle: () => void;
}

const MiniToggle: React.FC<MiniToggleProps> = ({ isActive, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className="w-[60px] h-[6px] flex-row rounded-full overflow-hidden"
    >
      {/* Left Half */}
      <View
        className="flex-1"
        style={{
          backgroundColor: isActive ? "#625D5D" : "#ccc",

          borderTopRightRadius: isActive ? 4 : 0,
          borderBottomRightRadius: isActive ? 4 : 0,
        }}
      />

      {/* Right Half */}
      <View
        className="flex-1"
        style={{
          backgroundColor: isActive ? "#ccc" : "#625D5D",
          borderTopLeftRadius: isActive ? 0 : 4,
          borderBottomLeftRadius: isActive ? 0 : 4,
        }}
      />
    </TouchableOpacity>
  );
};

export default MiniToggle;
