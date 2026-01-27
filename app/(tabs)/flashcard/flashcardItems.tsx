import AddFloatingButton from "@/components/AddFloatingButton";
import FlashcardItemCard from "@/components/FlashcardItemCard";
import Images from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { Dimensions, ImageBackground, ScrollView, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const FlashcardItems = () => {
  // UI-ONLY fake flashcards (inside a folder)
  const flashcards = [
    {
      id: "1",
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: "2",
      question: "What is NativeWind?",
      answer: "NativeWind is a Tailwind CSS implementation for React Native.",
    },
    {
      id: "3",
      question: "What is Expo Router?",
      answer: "Expo Router is a routing system for Expo and React Native apps.",
    },
  ];

  return (
    <ImageBackground
      source={Images.FlashcardBg}
      resizeMode="cover"
      className="flex-1 pt-20"
    >
      {/* TITLE */}
      <Text
        className="text-2xl font-bold mb-6 text-white text-center"
        style={{
          textShadowColor: "#000",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 2,
        }}
      >
        Science
      </Text>

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
      {/* Uncomment when you want to add new flashcards */}
      
      {/* <AddFloatingButton onPress={() => router.push("/createFlashcardItem")} /> */}
    </ImageBackground>
  );
};

export default FlashcardItems;
