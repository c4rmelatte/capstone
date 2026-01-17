import React, { useRef, useState } from "react";
import {
    ImageBackground,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,

} from "react-native";
import { router } from "expo-router";
import Images from "@/constants/images";

const ResetPasswordScreen = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
    const inputsRef = useRef<(TextInput | null)[]>([]); // Allow nulls

    const handleChange = (text: string, index: number) => {
        if (/^\d*$/.test(text)) {
            let newOtp = [...otp];

            // paste full OTP
            if (text.length === 6) {
                newOtp = text.split("").slice(0, 6);
                setOtp(newOtp);
                Keyboard.dismiss();
                return;
            }

            // Normal single-digit input
            newOtp[index] = text;
            setOtp(newOtp);

            // Auto-focus next or previous input
            if (text && index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
            if (!text && index > 0) {
                inputsRef.current[index - 1]?.focus();
            }

            // Hide keyboard if all inputs are filled
            if (newOtp.every((digit) => digit !== "")) {
                Keyboard.dismiss();
            }
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join("");
        console.log("Entered OTP:", enteredOtp);
        // Add verification logic here
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground
                source={Images.Loginbg}
                resizeMode="cover"
                className="flex-1 items-center justify-center px-6"
            >
                <View
                    style={{
                        width: "100%",
                        backgroundColor: "#FFF9E5",
                        borderRadius: 24,
                        paddingHorizontal: 24,
                        paddingVertical: 32,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        elevation: 5,
                        marginTop: 110,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "800",
                            textAlign: "center",
                            color: "black",
                            marginBottom: 12,
                        }}
                    >
                        Reset Password
                    </Text>

                    <Text
                        style={{
                            textAlign: "center",
                            color: "#4B3A00",
                            fontSize: 13,
                            marginBottom: 24,
                        }}
                    >
                        Enter the 6-digit OTP you received via email to reset your password.
                    </Text>

                    {/* 6 Individual OTP Inputs */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 24,
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
                                placeholder="X" // <-- Added placeholder here
                                placeholderTextColor="#9CA3AF" // optional: gray color
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: "#9CA3AF",
                                    textAlign: "center",
                                    fontSize: 20,
                                    fontWeight: "600",
                                    backgroundColor: "white",
                                }}
                            />
                        ))}
                    </View>

                    {/* Verify OTP Button */}
                    <TouchableOpacity
                        onPress={handleVerify}
                        style={{
                            backgroundColor: "#FFEF9A",
                            borderRadius: 14,
                            height: 48,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 16,
                        }}
                    >
                        <Text
                            style={{
                                color: "black",
                                fontWeight: "700",
                                fontSize: 16,
                            }}
                        >
                            VERIFY OTP
                        </Text>
                    </TouchableOpacity>

                    {/* Back to Login */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{ alignItems: "center" }}
                    >
                        <Text
                            style={{
                                color: "black",
                                fontWeight: "600",
                                textDecorationLine: "underline",
                                fontSize: 14,
                            }}
                        >
                            Back To Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default ResetPasswordScreen;
