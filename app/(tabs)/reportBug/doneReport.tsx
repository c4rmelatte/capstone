import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import Images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const DoneReport = () => {


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
            marginTop: "30%"
          }}
        >
          {/* TITLE */}
 <Text
          style={{
            fontSize: 36,
            fontWeight: "800",
            textAlign: "center",
            color: "black",
            marginBottom: 12,
          }}
        >
          Report Sent
        </Text>

        {/* Description */}
        <Text
          style={{
            textAlign: "center",
            color: "#4B3A00",
            fontSize: 15,
            marginBottom: 24,
          }}
        >
          Thanks for letting us know! We’ll work on fixing it as soon as possible.   </Text>
        
          <View style={{ width: "100%"}}>
            <CustomButton
              title="Back to Dashboard"
                onPress={() => router.push("/dashboard")}
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default DoneReport;
