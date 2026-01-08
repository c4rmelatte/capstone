import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Images from "@/constants/images";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <View style={{ width: "100%", marginBottom: 16, paddingHorizontal: 0 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 20,
          paddingHorizontal: 16,
          height: 48,
        }}
      >
        {/* Left Icon */}
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color="#9CA3AF"
            style={{ marginRight: 8 }}
          />
        )}

        {/* Text Input */}
        <TextInput
          style={{ flex: 1, fontSize: 14, color: "black" }}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={hidePassword}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          keyboardType={placeholder.toLowerCase().includes("email") ? "email-address" : "default"}
        />

        {/* Password Eye Toggle */}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

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
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
        />

        {/* Send OTP Button */}
        <TouchableOpacity
          onPress={() => {
            /* Your OTP sending logic here */
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
