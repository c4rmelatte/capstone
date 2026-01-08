import React from "react";
import { View } from "react-native";

interface PaginationProps {
  length: number; // number of slides
  currentIndex: number; // current active slide
  activeColor?: string; // Tailwind class for active line
  inactiveColor?: string; // Tailwind class for inactive line
  activeWidth?: number; // width of active line
  inactiveWidth?: number; // width of inactive lines
  height?: number; // height of lines
  spacing?: number; // horizontal margin between lines
}

const Pagination: React.FC<PaginationProps> = ({
  length,
  currentIndex,
  activeColor = "bg-pure-blue",
  inactiveColor = "bg-pure-gray/40",
  activeWidth = 32,
  inactiveWidth = 16,
  height = 4,
  spacing = 4,
}) => {
  return (
    <View className="flex-row justify-center mb-16">
      {Array.from({ length }).map((_, index) => (
        <View
          key={index}
          className={`rounded-full ${index === currentIndex ? activeColor : inactiveColor}`}
          style={{
            width: index === currentIndex ? activeWidth : inactiveWidth,
            height,
            marginHorizontal: spacing / 2,
          }}
        />
      ))}
    </View>
  );
};

export default Pagination;