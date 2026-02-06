import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Images from "@/constants/images";
import CustomButton from "@/components/CustomButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const { height } = Dimensions.get("window");
const FIELD_GAP = 16;

const ReportBug = () => {
  const [message, setMessage] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setCoverPhoto(result.assets[0].uri);
    }
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
            marginTop: "30%"
          }}
        >
          {/* TITLE */}
          <Text
        style={{
          fontSize: SCREEN_WIDTH * 0.07,
          fontWeight: "800",
          textAlign: "center",
          color: "black",
          marginBottom: "3%",
        }}
      >
        Report a Bug
      </Text>

          {/* IMAGE PICKER */}
          <View style={{ width: "100%", marginTop: FIELD_GAP }}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={pickImage}
              style={{
                width: "100%",
                height: height * 0.2,
                borderRadius: 20,
                backgroundColor: "#E5E5E5",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderWidth: 1.5,
                borderColor: "#000",
              }}
            >
              {coverPhoto ? (
                <Image
                  source={{ uri: coverPhoto }}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: "#D1D5DB",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Feather name="plus" size={24} color="#000" />
                  </View>
                  <Text style={{ marginTop: 10, fontWeight: "600" }}>
                    Add Photo Only
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* TEXT BOX */}
          <View style={{ width: "100%", marginTop: FIELD_GAP }}>
            <TextInput
              placeholder="What happened?"
              placeholderTextColor="#B0B0B0"
              multiline
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
              style={{
                width: "100%",
                height: height * 0.14,
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingTop: 14,
                fontSize: 14,
                borderWidth: 1.5,
                borderColor: "#000",
              }}
            />
          </View>

          {/* SUBMIT BUTTON */}
          <View style={{ width: "100%", marginTop: FIELD_GAP }}>
            <CustomButton
              title="Submit"
              onPress={() => {
                // submit logic
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default ReportBug;
