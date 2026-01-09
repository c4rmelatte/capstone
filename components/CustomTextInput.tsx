// components/CustomTextInput.tsx
import { Feather } from '@expo/vector-icons';
import React, { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  placeholder?: string;
  inputName?: string;
  iconName?: keyof typeof Feather.glyphMap;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ 
  placeholder, 
  inputName, 
  iconName, 
  secureTextEntry, 
  ...props 
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Logic para malaman kung itatago ang text
  const shouldHideText = secureTextEntry ? !isPasswordVisible : false;
  
  return (
    <View className="justify-center mb-3">
      {inputName ? (
        <Text className="text-base text-gray-500 font-bold mb-1 ml-4">
          {inputName}
        </Text>
      ) : null}
      
      <View className="w-[300px] h-[50px] bg-white border-2 border-black rounded-[100px] flex-row items-center px-5">
        {iconName && (
          <Feather name={iconName} size={20} color="#D1D1D1" />
        )}
        
        <TextInput
          className="flex-1 px-3 text-base text-black font-bold"
          placeholder={placeholder}
          placeholderTextColor="#D1D1D1"
          secureTextEntry={shouldHideText}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Feather 
              name={isPasswordVisible ? "eye" : "eye-off"} 
              size={20} 
              color="#D1D1D1" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;