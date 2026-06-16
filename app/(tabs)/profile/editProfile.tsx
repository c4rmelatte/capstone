import AppHeader from "@/components/AppHeader";
import Images from "@/constants/images";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, ImageBackground, View, Text, TouchableOpacity, Alert } from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import { Pencil } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

// constants
const defaultProfileImage = Images.DefaultProfile;
const defaultName = "Nina Carmela";
const defaultUsername = "ninacarmela";
const defaultEmail = "nambionina@gmail.com";
const defaultPassword = "123455678";

const EditProfile = () => {
  const router = useRouter();

  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [name, setName] = useState(defaultName);
  const [username, setUsername] = useState(defaultUsername);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);

  const changePassword = () => {
    router.push("/profile/changePasswordForm");
  };

  const pickImage = async () => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access photos is required!");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

const saveProfile = () => {
  // Show alert
  Alert.alert(
    "Profile Saved",         
    "Your profile has been successfully updated.", 
    [
      { 
        text: "OK", 
        onPress: () => router.push("/profile") // Navigate after pressing OK
      }
    ]
  );
};

  return (
    <ImageBackground source={Images.ProfileBg} className="flex-1">
      <StatusBar style="light" />
      <AppHeader />

      {/* profile section */}
      <View className="items-center" style={{ paddingHorizontal: "6%", marginTop: "12%" }}>
        {/* profile image */}
        <View className="border-4 border-[#502707] rounded-full overflow-hidden relative">
          <Image
            source={profileImage}
            className="rounded-full"
            resizeMode="cover"
            style={{ width: "48%", height: undefined, aspectRatio: 1 }}
          />

          {/* Editable overlay with pencil */}
          <TouchableOpacity
            onPress={pickImage}
            className="absolute inset-0 justify-center items-center rounded-full"
            style={{ backgroundColor: "rgba(255, 239, 154, 0.3)" }}
          >
            <Pencil size={28} color="#502707" />
          </TouchableOpacity>
        </View>

      <View className="mt-5 px-4 gap-2" style={{width:"100%"}}>

          <Text className="pl-3">Name:</Text>
          <CustomTextInput
            iconName="user"
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />

          <Text className="pl-3">Email:</Text>
          <CustomTextInput
            iconName="mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="pl-3">Username:</Text>
          <CustomTextInput
            iconName="user"
            textContentType="username"
            value={username}
            onChangeText={setUsername}
          />

          <Text className="pl-3">Password:</Text>
          <CustomTextInput
            iconName="lock"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text className="mr-2"
            style={{
            
              color: "#CB4848",
              textDecorationLine: "underline",
              fontWeight: "bold",
              textAlign: "right", // aligns text to the right
            }}
            onPress={changePassword}
          >
            Change Password
          </Text>
        </View>

        {/* buttonsssssssss */}
        <View className=" flex flex-row px-6 mt-14 " style={{ width: "90%" }}>
          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              flex: 1,
              marginRight: 10,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              paddingVertical: 15,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity
            onPress={saveProfile}
            style={{
              flex: 1,
              marginLeft: 10,
              backgroundColor: "#80CF8F",
              borderRadius: 20,
              paddingVertical: 15,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default EditProfile;
