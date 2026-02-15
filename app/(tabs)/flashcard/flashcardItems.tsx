import AddFloatingButton from "@/components/AddFloatingButton";
import FlashcardItemCard from "@/components/FlashcardItemCard";
import Images from "@/constants/images";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pencil, Play, ChevronLeft, Check } from "lucide-react-native";
import AppHeader from "@/components/AppHeader";

const { width } = Dimensions.get("window");

const FlashcardItems = () => {
  const [editing, setEditing] = useState(false);

  const [flashcards, setFlashcards] = useState([
    { id: "1", question: "What is the chemical formula of water?", answer: "H2O" },
    { id: "2", question: "What process do plants use to make food using sunlight?", answer: "Photosynthesis" },
    { id: "3", question: "What force pulls objects toward the center of the Earth?", answer: "Gravity" },
  ]);

  const folderName = "Science";

  const handlePlayFlashcard = () => {
    router.push("/(tabs)/flashcard/playFlashcard");
  };

  const handleDeleteCard = (id: string) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
  };

  const handleEditCard = (id: string) => {
    router.push("/(tabs)/flashcard/updateFlashcardItem");
  };

  return (
    <ImageBackground
      source={Images.FlashcardBg}
      className="flex-1"
      resizeMode="cover"
    >
      <AppHeader />

      {/* HEADER */}
      <View className="flex-row items-center justify-between px-6 mt-7 mb-6">
        <TouchableOpacity onPress={() => router.push("/(tabs)/flashcard")}>
          <ChevronLeft size={28} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-4xl font-bold text-[#FDE6B1] text-center flex-1">
          {folderName}
        </Text>

        <TouchableOpacity
          className="mr-[2%]"
          onPress={() => setEditing(!editing)}
        >
          {editing ? (
            <Check size={28} color="#06402B" />
          ) : (
            <Pencil size={28} color="white" />
          )}
        </TouchableOpacity>
      </View>

      {/* PLAY BUTTON */}
      <View className="flex-row justify-end px-6 mb-4">
        <TouchableOpacity onPress={handlePlayFlashcard}>
          <View className="bg-[#FFF9E5] rounded-3xl p-3">
            <Play size={32} />
          </View>
        </TouchableOpacity>
      </View>

      {/* FLASHCARDS */}
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 80,
        }}
      >
        {flashcards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            activeOpacity={0.85}
            onPress={() => handleEditCard(card.id)}
          >
            <FlashcardItemCard
              folderId={card.id}
              questionNumber={index + 1}
              question={card.question}
              answer={card.answer}
              isEditing={editing}
              onDelete={() => handleDeleteCard(card.id)}
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
