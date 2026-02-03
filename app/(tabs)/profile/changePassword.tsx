import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import Images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = () => {
    if (!password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    Alert.alert("Success", "Your password has been changed successfully.", [
      {
        text: "OK",
        onPress: () => router.push("/login"),
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={Images.Loginbg}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: "5%",
        }}
      >
        {/* CARD */}
        <View
          style={{
            width: "100%",
            backgroundColor: "#FFF9E5",
            borderRadius: 24,
            paddingVertical: "8%",
            paddingHorizontal: "6%",
            alignItems: "center", // 👈 center everything inside
            
          }}
        >
          <Text
            style={{
              fontSize: SCREEN_WIDTH * 0.07,
              fontWeight: "800",
              textAlign: "center",
              color: "black",
              marginBottom: "3%",
              
            }}
          >
            Change Password
          </Text>

          <Text
            style={{
              textAlign: "center",
              color: "#4B3A00",
              fontSize: 14,
              marginBottom: "8%",
            }}
          >
            Please set a new password for your account.
          </Text>
          

          {/* INPUTS WRAPPER */}

          <View>
<View style={{ width: "100%" }}>
  {/* Password */}
  <Text
    style={{
      width: "100%",
      marginBottom: "2%",
      textAlign: "left",
      color: "#4B3A00",
    }}
  >
    Password
  </Text>

  <CustomTextInput
    iconName="lock"
    secureTextEntry
    value={password}
    onChangeText={setPassword}
  />

  {/* Confirm Password */}
  <Text
    style={{
      width: "100%",
      marginTop: "2%",
      marginBottom: "2%",
      textAlign: "left",
      color: "#4B3A00",
      
    }}
  >
    Confirm Password
  </Text>

  <CustomTextInput
    iconName="lock"
    secureTextEntry
    value={confirmPassword}
    onChangeText={setConfirmPassword}
  />
</View>

          </View>



          {/* BUTTON */}
          <View className="flex justify-center items-center" style={{ marginTop: "5%", width: "100%" }}>
            <CustomButton
              title="CHANGE PASSWORD"
              onPress={changePassword}
              containerStyle="w-full"
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;
