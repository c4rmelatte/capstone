// components/CustomTextInput.tsx
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  placeholder?: string;
  inputName?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, inputName, ...props }) => {
  return (
    <View className="justify-center mb-2">
      <Text className="text-base text-pure-gray-2 pb-3 font-bold">{inputName}</Text>
      <View className="w-[318px] h-[47px] border border-pure-gray-2 rounded-[10px] justify-center mb-4">
        <TextInput
          className="px-4 text-base text-black"
          placeholder={placeholder}
          placeholderTextColor="#888"
          {...props}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;
