// app/login.tsx
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import Images from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const router = useRouter();

  return (
        <ImageBackground
          source={Images.Loginbg}
          resizeMode="cover"
          className="flex-1 items-center"
        >

        <View className="items-center mt-10">
          {/* Back Arrow */}
          {/* <TouchableOpacity onPress={() => router.back()} className="absolute left-6 top-20">
            <Ionicons name="arrow-back" size={28} color="#38BDF8" />
          </TouchableOpacity> */}

          {/* Title */}
          <View className="pb-5 items-center">
            <Text className="mt-44 text-[70px] font-black text-[#FFEF9A]"
            style={{
            // Mimicking the thick black outline and shadow
            textShadowColor: '#000000',
            textShadowOffset: { width: 4, height: 4 },
            textShadowRadius: 1,
            fontFamily: 'System', // Use a rounded font like 'Fredoka' or 'Nunito' if available
            letterSpacing: 1,
          }}
          >
              REGISTER
            </Text>
            <Text className="text-[#553A00] text-center text-[17px]"
                      style={{
            fontFamily: 'Poppins-Bold', 
            fontWeight: '700',          
            textShadowColor: 'rgba(0, 0, 0, 0.25)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4, // Blur: 4
          }}>
              Time to get inky — it’s time to study!
            </Text>
          </View>

          {/* Inputs */}
          <View className="gap-0">
            <CustomTextInput placeholder="Full Name" keyboardType="default" />
            <CustomTextInput placeholder="Email Address" keyboardType="email-address" />
            <CustomTextInput placeholder="Username" textContentType="username" />
            <CustomTextInput placeholder="Password" secureTextEntry/>
            <CustomTextInput placeholder="Confirm Password" secureTextEntry/>
          </View>

          <View className="h-8" />
          {/* Login Button */}
          <CustomButton title="Sign Up" onPress={() => {}} />

          {/* Sign Up Link */}
          <View className="flex-row mt-4">
            <Text className="text-white">Already a buddy? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text className="text-white font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
    </ImageBackground>
  );
};

export default LoginScreen;
