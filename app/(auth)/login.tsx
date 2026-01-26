import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import Images from "@/constants/images";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ImageBackground, Text, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const { login, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      Alert.alert("Success", "Logged in successfully!");
     // router.replace("/(tabs)/home");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ImageBackground
      source={Images.Loginbg}
      resizeMode="cover"
      className="flex-1 items-center pt-44 px-6"
    >
      {/* Back Button
      <TouchableOpacity onPress={() => router.back()} className="absolute left-6 top-24">
        <Ionicons name="arrow-back" size={28} color="#38BDF8" />
      </TouchableOpacity> */}

      {/* Header */}
      <View className="pb-10 pr-10">
        <Text className="mt-20 text-[75px] font-black text-[#FFEF9A]"
          style={{
            // Mimicking the thick black outline and shadow
            textShadowColor: '#000000',
            textShadowOffset: { width: 4, height: 4 },
            textShadowRadius: 1,
            fontFamily: 'System', // Use a rounded font like 'Fredoka' or 'Nunito' if available
            letterSpacing: 1,
          }}>
          LOGIN
        </Text>

        <Text className="text-[#553A00] text-[19px]"
          style={{
            fontFamily: 'Poppins-Bold', // Ensure this matches your linked font name
            fontWeight: '700',          // Explicitly set bold if Poppins-Bold isn't loaded
            textShadowColor: 'rgba(0, 0, 0, 0.25)', // Color #000000 at 25%
            textShadowOffset: { width: 0, height: 2 }, // X: 0, Y: 4
            textShadowRadius: 4, // Blur: 4
          }}>
          Excited to see you again, buddy!
        </Text>
      </View>

      {/* Inputs */}
      <CustomTextInput
        placeholder="Username"
        textContentType="username"
        // inputName="Username"
        iconName="user"
        value={username}
        onChangeText={setUsername}
      />
      <CustomTextInput
        placeholder="Password"
        secureTextEntry
        // inputName="Password"
        iconName="lock"
        value={password}
        onChangeText={setPassword}
      />

      {/* Forgot Password */}
      <TouchableOpacity
        className="self-end mr-[20px]" onPress={() => router.push("/forgetpass")}>
        <Text className="text-white font-bold mt-3 mb-10">Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <CustomButton
        title={loading ? "Logging in..." : "Sign In"}
        onPress={() => router.push("/(tabs)/flashcard")}
      />

      {/* Sign Up */}
      <View className="flex-row mt-4">
        <Text className="text-white">Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text className="text-white font-bold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
