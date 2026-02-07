import React, { useRef, useState } from "react";
import { ImageBackground, TouchableWithoutFeedback, Keyboard, TextInput, Alert , View} from "react-native";
import Images from "@/constants/images";
import OtpPassword from "@/components/OtpPassword";
import ChangePassword from "@/components/ChangePassword";
import { router } from "expo-router";

const ChangePasswordForm = () => {
    // OTP state and refs (parent)
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef<(TextInput | null)[]>([]);

    // Password state
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Track whether OTP is verified
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleVerify = () => {
        const enteredOtp = otp.join("");
        console.log("Entered OTP:", enteredOtp);

        // For example, let's assume correct OTP is "123456"
        if (enteredOtp === "123456") {
            setIsOtpVerified(true); // show password form
        } else {
            Alert.alert("Invalid OTP", "The OTP you entered is incorrect.");
        }
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

    const handleChangePassword = () => {
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

                
                {isOtpVerified ? (
                    <ChangePassword
                        password={password}
                        confirmPassword={confirmPassword}
                        onPasswordChange={setPassword}
                        onConfirmPasswordChange={setConfirmPassword}
                        onSubmit={handleChangePassword}
                    />
                ) : (

                   

                        <OtpPassword
                        otp={otp}
                        inputsRef={inputsRef}
                        onChange={handleChange}
                        onVerify={handleVerify}
                    />

                    
                    
                )}
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default ChangePasswordForm;
