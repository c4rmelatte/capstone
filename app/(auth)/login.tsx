import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import Images from "@/constants/images";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ImageBackground, Text, TouchableOpacity, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const LoginScreen = () => {
  const { login, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      Alert.alert("Success", "Logged in successfully!");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ImageBackground source={Images.Loginbg} className="flex-1" resizeMode="cover">
      <View
        style={{
          width: "100%",
          paddingVertical: "35%",
          paddingHorizontal: "6%",
          marginTop: "30%",
        }}
      >
        {/* Header (LEFT, aligned with inputs) */}
        <View className="mb-10">
          <Text
            style={{
              fontSize: width < 380 ? 56 : 72,
              fontWeight: "900",
              color: "#FFEF9A",
              textShadowColor: "#000",
              textShadowOffset: { width: 4, height: 4 },
              textShadowRadius: 1,
              letterSpacing: 1,
            }}
          >
            LOGIN
          </Text>

          <Text
            style={{
              marginTop: 6,
              fontSize: 18,
              color: "#553A00",
              fontWeight: "700",
              textShadowColor: "rgba(0,0,0,0.25)",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }}
          >
            Excited to see you again, buddy!
          </Text>
        </View>

        {/* Form */}
        <View className="items-center">
          <CustomTextInput
            placeholder="Username"
            textContentType="username"
            iconName="user"
            value={username}
            onChangeText={setUsername}
          />

          <CustomTextInput
            placeholder="Password"
            secureTextEntry
            iconName="lock"
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot Password (RIGHT, aligned to input width) */}
          <TouchableOpacity
            className="self-end mt-3 mb-8"
            onPress={() => router.push("/forgetpass")}
          >
            <Text className="text-white font-bold">Forgot Password?</Text>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
            }}
          >
            {/* Login Button */}
            <CustomButton
              title={loading ? "Logging in..." : "Sign In"}
              onPress={() => router.push("/(tabs)/dashboard")}
            />
          </View>
        </View>

        {/* Sign Up */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-white">Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text className="text-white font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
