import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const WelcomeScreen = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  const stubySize = SCREEN_WIDTH * 0.65;
  const titleSize = SCREEN_WIDTH * 0.75;
  const overlapMargin = -(titleSize * 0.35);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      delay: 4000,
      useNativeDriver: true,
    }).start(() => {
      router.replace("/login");
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {/* BACKGROUND IMAGE */}
      <Image
        source={require("../../assets/images/imgsplashscreen.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
        }}
        resizeMode="cover" // Sinisiguro nito na walang gaps
      />

      {/* LOTTIE CONTENT */}
      <LottieView
        source={require("../../assets/animations/Stuby.json")}
        autoPlay
        loop
        style={{ width: stubySize, height: stubySize }}
      />
      <LottieView
        source={require("../../assets/animations/title.json")}
        autoPlay
        loop
        style={{
          width: titleSize,
          height: titleSize,
          marginTop: overlapMargin,
        }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
