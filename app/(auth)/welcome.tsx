import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground } from "react-native";
import { router } from "expo-router";
import Images from "@/constants/images";

const WelcomeScreen = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      delay: 1000, 
      useNativeDriver: true,
    }).start(() => {
      router.replace("/login");
    });
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity }}>
      <ImageBackground
        source={Images.Image_BG}
        resizeMode="cover"
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
};

export default WelcomeScreen;
