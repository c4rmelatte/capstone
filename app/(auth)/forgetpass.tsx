import React, { useState } from "react";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Images from "@/constants/images";
import CustomTextInput from "@/components/CustomTextInput"; // Use imported component

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  return (
    <ImageBackground
      source={Images.Loginbg}
      resizeMode="cover"
      className="flex-1 items-center justify-center px-6"
    >
      {/* Card */}
      <View
        style={{
          width: "100%",
          backgroundColor: "#FFF9E5",
          borderRadius: 24,
          paddingHorizontal: 24,
          paddingVertical: 32,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          marginTop: 110,
        }}
      >
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
          Forgot Password
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
          Enter your e-mail address below, and we’ll send an OTP to your email to
          verify it.
        </Text>

        {/* Email Label */}
        <Text
          style={{
            color: "black",
            fontWeight: "600",
            marginBottom: 8,
            fontSize: 14,
          }}
        >
          Email
        </Text>

        {/* Email Input */}
        <CustomTextInput
          placeholder="Enter your email address"
          iconName="mail"
          value={email}
          onChangeText={setEmail}
        />

        {/* Send OTP Button */}
        <TouchableOpacity
          onPress={() => {
            router.push("/resetpass")
          }}
          style={{
            backgroundColor: "#FFEF9A",
            borderRadius: 14,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            SEND EMAIL OTP
          </Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 24, alignItems: "center" }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "600",
              textDecorationLine: "underline",
              fontSize: 14,
            }}
          >
            Back To Login
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;
