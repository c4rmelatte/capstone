import AddFloatingButton from "@/components/AddFloatingButton";
import FlashcardItemCard from "@/components/FlashcardItemCard";
import Images from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { Dimensions, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft, Pencil } from "lucide-react-native";

const { width } = Dimensions.get("window");

const FlashcardItems = () => {
  const flashcards = [
    { id: "1", question: "What is the chemical formula of water?", answer: "H2O" },
    { id: "2", question: "What process do plants use to make food using sunlight?", answer: "Photosynthesis" },
    { id: "3", question: "What force pulls objects toward the center of the Earth?", answer: "Gravity" },
  ];

  const folderName = "Science"; // use const for folder name

  return (
    <ImageBackground
      source={Images.FlashcardBg}
      resizeMode="cover"
      className="flex-1 pt-20"
    >
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 mb-6">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={28} color="white" />
        </TouchableOpacity>

        {/* Folder Name */}
        <Text
          className="text-4xl font-bold text-white text-center flex-1"
          style={{
            textShadowColor: "#000",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 2,
          }}
        >
          {folderName}
        </Text>

        {/* Edit Icon */}
        <TouchableOpacity onPress={() => console.log("Edit folder")}>
          <Pencil size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* FLASHCARDS */}
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {flashcards.map((card, index) => (
          <FlashcardItemCard
            key={card.id}
            folderId={card.id}
            questionNumber={index + 1}
            question={card.question}
            answer={card.answer}
            onItemEdit={() => console.log("Edit card:", card.id)}
            onDelete={() => console.log("Delete card:", card.id)}
          />
        ))}
      </ScrollView>

      {/* FLOATING BUTTON */}
      {/* <AddFloatingButton onPress={() => router.push("/createFlashcardItem")} /> */}
    </ImageBackground>
  );
};

export default FlashcardItems;
