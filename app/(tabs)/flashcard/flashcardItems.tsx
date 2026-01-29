import AddFloatingButton from "@/components/AddFloatingButton";
import FlashcardItemCard from "@/components/FlashcardItemCard";
import Images from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pencil } from "lucide-react-native";

const { width } = Dimensions.get("window");

const FlashcardItems = () => {
  // Sample flashcards
  const flashcards = [
    { id: "1", question: "What is the chemical formula of water?", answer: "H2O" },
    { id: "2", question: "What process do plants use to make food using sunlight?", answer: "Photosynthesis" },
    { id: "3", question: "What force pulls objects toward the center of the Earth?", answer: "Gravity" },
  ];

  const folderName = "Science";

  const editFlashcardItems = () => {
    console.log("Edit folder clicked:", folderName);
    router.push("/(tabs)/flashcard/updateFlashcardItem");
  };

  return (
    <ImageBackground
      source={Images.FlashcardBg}
      resizeMode="cover"
      className="flex-1 pt-20"
    >
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 mb-6 relative">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-2xl font-bold text-white">{` <`}</Text>
        </TouchableOpacity>

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

        <TouchableOpacity >
          <Pencil size={28} color="white" onPress={() =>
          router.push("/(tabs)/flashcard/updateFlashcardItem")
        }/>
        </TouchableOpacity>
      </View>

      {/* FLASHCARDS */}
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {flashcards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            activeOpacity={0.85}
            onPress={() =>
              console.log("Flashcard clicked from map:", card.id)
            }
          >
            <FlashcardItemCard
              folderId={card.id}
              questionNumber={index + 1}
              question={card.question}
              answer={card.answer}
              onItemEdit={() => console.log("Edit card:", card.id)}
              onDelete={() => console.log("Delete card:", card.id)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FLOATING BUTTON */}
      <AddFloatingButton
        onPress={() =>
          router.push("/(tabs)/flashcard/createFlashcardItem")
        }
      />
    </ImageBackground>
  );
};

export default FlashcardItems;
