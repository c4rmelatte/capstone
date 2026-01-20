import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import Images from "@/constants/images";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";

const ChangePasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleChangePassword = () => {
    console.log("New Password:", newPassword);
    console.log("Re-entered Password:", reEnterPassword);
    router.push("/okaypass");
  };

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
            Change Password
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
            Enter your new password below.
          </Text>

          {/* New Password */}
          <CustomTextInput
            placeholder="New Password"
            inputName="New Password"
            iconName="lock"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          {/* Re-enter Password */}
          <CustomTextInput
            placeholder="Re-enter New Password"
            inputName="Re-enter Password"
            iconName="lock"
            secureTextEntry
            value={reEnterPassword}
            onChangeText={setReEnterPassword}
          />

          {/* Change Password Button */}
          <CustomButton
            title="Change Password"
            onPress={handleChangePassword}
            containerStyle="mt-6"
          />

          {/* Back to Login */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginTop: 24, alignItems: "center" }}
          >
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ChangePasswordScreen;
