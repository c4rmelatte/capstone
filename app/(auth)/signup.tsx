// app/login.tsx
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center pt-44 px-6 relative">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => router.back()} className="absolute left-6 top-24">
        <Ionicons name="arrow-back" size={28} color="#38BDF8" />
      </TouchableOpacity>

      {/* Title */}
      <View className="pb-10">
        <Text className="text-[20px] font-bold text-left text-pure-blue mb-2 px-6">
          Create Your Account
        </Text>
        <Text className="text-[#625D5D] text-left mb-8 px-6 text-[14px]">
          Please fill in your email and password to login to your account.
        </Text>
      </View>

      {/* Inputs */}
      <CustomTextInput placeholder="Name" keyboardType="default" inputName="Name" />
      <CustomTextInput placeholder="Email" keyboardType="email-address" inputName="Email" />
      <CustomTextInput placeholder="Password" secureTextEntry inputName="Password" />
      <CustomTextInput
        placeholder="Confirm Password"
        secureTextEntry
        inputName="Confirm Password"
      />
      <View className="h-6" />
      {/* Login Button */}
      <CustomButton title="Create An Account" onPress={() => {}} />

      {/* Sign Up Link */}
      <View className="flex-row mt-6">
        <Text className="text-pure-gray-2">Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-pure-blue font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
