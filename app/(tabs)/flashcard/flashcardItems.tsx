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
import { Pencil, Play, ChevronLeft } from "lucide-react-native"; // <-- Added Play icon
import AppHeader from "@/components/AppHeader";

const { width } = Dimensions.get("window");

const FlashcardItems = () => {
  // Sample flashcards
  const flashcards = [
    { id: "1", question: "What is the chemical formula of water?", answer: "H2O" },
    { id: "2", question: "What process do plants use to make food using sunlight?", answer: "Photosynthesis" },
    { id: "3", question: "What force pulls objects toward the center of the Earth?", answer: "Gravity" },
  ];

  const handlePlayFlashcard = () => {
    console.log("Play flashcard session started");
  }

  const folderName = "Science";

  const editFlashcardItems = () => {
    console.log("Edit folder clicked:", folderName);
    router.push("/(tabs)/flashcard/updateFlashcardItem");
  };

  return (
    <ImageBackground source={Images.FlashcardBg} className="flex-1" resizeMode="cover">
      <AppHeader/>
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-6 mt-7 mb-6 relative">
        <TouchableOpacity onPress={() => router.back()}>
         <ChevronLeft size={28} color="#ffffff" />
        </TouchableOpacity>

        <Text
          className="text-4xl font-bold text-[#FDE6B1] text-center flex-1"
        >
          {folderName}
        </Text>

        <TouchableOpacity onPress={editFlashcardItems}>
          <Pencil size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* ICON BELOW HEADER */}
      <View className="flex-row justify-end px-6 mb-4">
        <TouchableOpacity onPress={handlePlayFlashcard}>
         <View className="bg-[#FFF9E5] rounded-3xl p-3">
          <Play size={32}  />
        </View>
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
        onPress={() => router.push("/(tabs)/flashcard/createFlashcardItem")}
      />
    </ImageBackground>
  );
};

export default FlashcardItems;
