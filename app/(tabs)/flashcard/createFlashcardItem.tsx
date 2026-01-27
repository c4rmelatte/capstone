import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { ArrowLeft, Plus } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const CreateFlashcardItem = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSave = () => {
    console.log("Saved Flashcard:", { title, question, answer });
    // Add your save logic here
  };

  return (
    <View className="flex-1 bg-green-200 p-4 relative">
      
    </View>
  );
};

export default CreateFlashcardItem;
