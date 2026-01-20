import { View, Animated, Dimensions } from "react-native";

type IntroDotsProps = {
  total: number;
  scrollX: Animated.Value;
  width: number; // page width
};

const { width: screenWidth } = Dimensions.get("window");

export default function IntroDots({ total, scrollX, width }: IntroDotsProps) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 55, // same vertical height as arrow (adjust as needed)
        width: screenWidth,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const dotWidth = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [8, 16, 8],
          extrapolate: "clamp",
        });

        const dotColor = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: ["#D1D5DB", "#5DCCFC", "#D1D5DB"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i}
            style={{
              width: dotWidth,
              height: 8,
              borderRadius: 4,
              backgroundColor: dotColor,
              marginHorizontal: 4,
            }}
          />
        );
      })}
    </View>
  );
}
