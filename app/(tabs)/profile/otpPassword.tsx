import React, { useRef, useState } from "react";
import {
    ImageBackground,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Platform,
} from "react-native";
import { router } from "expo-router";
import Images from "@/constants/images";
import CustomButton from "@/components/CustomButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const OtpPassword = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef<(TextInput | null)[]>([]);


    //button change passsssssssss
    const handleVerify = () => {
        const enteredOtp = otp.join("");
        console.log("Entered OTP:", enteredOtp);
        router.push("/profile/changePassword");
    };




    const handleChange = (text: string, index: number) => {
        if (/^\d*$/.test(text)) {
            let newOtp = [...otp];

            // Paste full OTP
            if (text.length === 6) {
                newOtp = text.split("").slice(0, 6);
                setOtp(newOtp);
                Keyboard.dismiss();
                return;
            }

            newOtp[index] = text;
            setOtp(newOtp);

            if (text && index < 5) inputsRef.current[index + 1]?.focus();
            if (!text && index > 0) inputsRef.current[index - 1]?.focus();

            if (newOtp.every((digit) => digit !== "")) Keyboard.dismiss();
        }
    };

    

    // Calculate OTP input size dynamically based on screen width
    const inputWidthPercent = 12; // each input ~12% of screen width
    const inputMarginPercent = 2; // spacing between inputs ~2% of screen width

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                <View
                    style={{
                        width: "90%",
                        backgroundColor: "#FFF9E5",
                        borderRadius: 6 + "%", // responsive border radius
                        paddingHorizontal: "5%",
                        paddingVertical: "8%",
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        elevation: 5,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: SCREEN_WIDTH * 0.07, // responsive font
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
                            fontSize: SCREEN_WIDTH * 0.035, // responsive
                            marginBottom: "5%",
                        }}
                    >
                        Please check your email for the OTP to verify your account.
                    </Text>

                    {/* OTP Inputs */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            marginBottom: "6%",
                        }}
                    >
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref: TextInput | null) => {
                                    inputsRef.current[index] = ref;
                                }}
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                placeholder="X"
                                placeholderTextColor="#9CA3AF"
                                style={{
                                    width: `${inputWidthPercent}%`,
                                    height: 50,
                                    marginHorizontal: `${inputMarginPercent / 2}%`,
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: "#9CA3AF",
                                    textAlign: "center",
                                    fontSize: SCREEN_WIDTH * 0.05,
                                    fontWeight: "600",
                                    backgroundColor: "white",
                                    
                                }}
                            />
                        ))}
                    </View>

                    {/* Verify OTP Button */}
                    <CustomButton
                        title="VERIFY OTP"
                        onPress={handleVerify}
                        containerStyle="w-full"
                    />
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default OtpPassword;
