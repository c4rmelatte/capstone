import React from "react";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Images from "@/constants/images";
import CustomButton from "@/components/CustomButton";

const OkayPasswordScreen = () => {
  return (
    <ImageBackground
      source={Images.Loginbg}
      resizeMode="cover"
      className="flex-1 items-center justify-center px-6"
    >
      <View
        style={{
          width: "100%",
          marginTop: 110,
        }}
      >
        <View
          style={{
            backgroundColor: "#FFF9E5",
            borderRadius: 24,
            paddingHorizontal: 24,
            paddingVertical: 32,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            alignItems: "center",
          }}
        >
             <ImageBackground
            source={Images.Check} // Make sure checked.png is imported in Images
            style={{ width: 80, height: 80, marginBottom: 16 }}
            resizeMode="contain"
          />
          {/* Title */}
          <Text
            style={{
              fontSize: 26,
              fontWeight: "800",
              textAlign: "center",
              color: "black",
              marginBottom: 12,
            }}
          >
            Password Changed
          </Text>

          {/* Description */}
          <Text
            style={{
              textAlign: "center",
              color: "#4B3A00",
              fontSize: 13,
              marginBottom: 24,
            }}
          >
            Your password has been changed successfully.
          </Text>

          {/* Back to Login Button */}
          <CustomButton
            title="Back To Login"
            onPress={() => router.push("/login")}
            containerStyle="mt-6"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default OkayPasswordScreen;
