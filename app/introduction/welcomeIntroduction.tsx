import React from "react";
import { Text, Image, View, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import YellowButton from "@/components/YellowButton";
import Images from "@/constants/images";

const { height, width } = Dimensions.get("window");

// Optional: scale function for responsive font sizes
const scaleFont = (size: number): number => (size * width) / 375; // 375 is iPhone X width baseline

export default function WelcomeIntroduction() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Top Part - Yellow Wave + Logo */}
      <View style={styles.topContainer}>
        <Image 
          source={Images.YellowWaveIntro}
          style={styles.waveImage}
          resizeMode="stretch"
        />
        <View style={styles.logoContainer}>
          <Image
            source={Images.StubyLogo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>WELCOME</Text>
          <Text style={styles.description}>
            Welcome to STUBY – your smart study buddy for better learning. Whether you're prepping for exams, organizing notes, or exploring new techniques, STUBY brings it all together in one simple app. Let’s start your journey to better study habits today!
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <YellowButton
            title="Go to Next"
            onPress={() => router.replace("/introduction/introductionFlow")}
          />
        </View>
      </View>


    </View>
  );
}
const LOGO_WIDTH = width * 0.9;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7abbaf",
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
  width: '100%',
  height: height * 0.35, // match remaining screen height
  justifyContent: "flex-end", // push content to bottom
  paddingHorizontal: width * 0.06,
  paddingBottom: height * 0.05, // space from bottom
},
textWrapper: {
  justifyContent: "flex-start", // texts start at top of bottomContainer
  marginBottom: height * 0.03, // spacing before button
},


  title: {
    fontSize: scaleFont(30),
    fontWeight: "600",
    color: "white",
    marginBottom: height * 0.015,
  },

  description: {
    fontSize: scaleFont(18),
    color: "white",
    lineHeight: scaleFont(24),
    textAlign: "justify",
  },

  buttonWrapper: {
    alignItems: "center",
  },
});
