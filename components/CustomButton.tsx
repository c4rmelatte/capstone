import React from "react";
import { Text, TextStyle, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string; // Tailwind class
  textColor?: string; // Tailwind class
  width?: number; // always in pixels
  height?: number; // always in pixels
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  containerStyle?: string; // extra Tailwind classes
  textStyle?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = "bg-pure-blue",
  textColor = "text-white",
  width = 318, // number in pixels
  height = 60,
  borderRadius = 10,
  fontSize = 18,
  fontWeight = "700",
  containerStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`items-center justify-center ${backgroundColor} ${containerStyle}`}
      style={{
        width,       // ✅ number
        height,      // ✅ number
        borderRadius // ✅ number
      }}
    >
      <Text
        className={`${textColor} ${textStyle}`}
        style={{
          fontSize,
          fontWeight,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;