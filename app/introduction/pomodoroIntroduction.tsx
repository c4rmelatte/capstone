import React from "react";
import { Text, Image, View, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import YellowButton from "@/components/YellowButton";
import Images from "@/constants/images";

const { height, width } = Dimensions.get("window");

// Optional: scale function for responsive font sizes
const scaleFont = (size: number): number => (size * width) / 375; // 375 is iPhone X width baseline

export default function PomodoroIntroduction() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Top Part - Yellow Wave + Logo */}
      <View style={styles.topContainer}>
        <Image 
          source={Images.PomodoroWaveBg}
          style={styles.waveImage}
          resizeMode="stretch"
        />
        <View style={styles.logoContainer}>
          <Image
            source={Images.TimeFocus}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Part - Text + Button */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Time Focus</Text>
        <Text style={styles.description}>
          Study in focused intervals with relaxing breaks in between. Boost productivity and avoid burnout!   
        </Text>
        
      </View>

    </View>
  );
}
const LOGO_WIDTH = width * 0.9;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E5",
  },

  topContainer: {
    width: "100%",
    height: height * 0.7, // more balanced across devices
    position: "relative",
  },

  waveImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginBottom: height * 0.1,
  },

logoImage: {
  width: LOGO_WIDTH,
  height: LOGO_WIDTH, // keeps it visually balanced
  resizeMode: "contain",
},

bottomContainer: {
  flex: 1,
  justifyContent: "flex-start",
  paddingHorizontal: width * 0.06,
},

  title: {
    fontSize: scaleFont(30),
    fontWeight: "600",
    color: "black",
    marginBottom: height * 0.015,
  },

  description: {
    fontSize: scaleFont(18),
    color: "black",
    lineHeight: scaleFont(24),
    textAlign: "justify",
  },

  buttonWrapper: {
    alignItems: "center",
  },
});
