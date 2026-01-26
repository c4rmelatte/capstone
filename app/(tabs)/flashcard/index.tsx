import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import AddFloatingButton from "@/components/AddFloatingButton";
import FlashcardFolder from "@/components/FlashcardFolder";
import Images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const FlashCard = () => {
  const params = useLocalSearchParams();

  const [flashcards, setFlashcards] = useState([
    {
      id: "1",
      text: "FlashCard Content 1",
      image: Images.MusicBg,
    },
    {
      id: "2",
      text: "FlashCard Content 2",
      image: null,
    },
  ]);

  // ✅ ADD NEW FLASHCARD ON TOP
  useEffect(() => {
    if (!params?.id) return;

    setFlashcards(prev => {
      if (prev.some(card => card.id === params.id)) return prev;

      return [
        {
          id: params.id as string,
          text: params.title as string,
          image: params.coverPhoto
            ? { uri: params.coverPhoto as string }
            : null,
        },
        ...prev,
      ];
    });
  }, [params?.id]);

  // ✅ DELETE
  const handleDelete = (id: string) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
  };

  // ✅ EDIT (navigate)
  const handleEdit = (id: string) => {
    router.push({
      pathname: "/flashcard/updateFlashcardFolder",
      params: { editId: id },
    });
  };

  return (
    <ImageBackground
      source={Images.FlashcardBg}
      resizeMode="cover"
      className="flex-1 pt-20"
    >
      <Text
        className="text-2xl font-bold mb-6 text-white text-center"
        style={{
          textShadowColor: "#000",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 2,
        }}
      >
        FlashCard Screen
      </Text>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {flashcards.map(card => (
          <View
            key={card.id}
            className="overflow-hidden rounded-2xl shadow-md mb-4"
            style={{ width: width * 0.9, height: 180 }}
          >
            <FlashcardFolder
              folderId={card.id}
              text={card.text}
              image={card.image}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </View>
        ))}
      </ScrollView>

      <AddFloatingButton
        onPress={() => router.push("/flashcard/createFlashcardFolder")}
      />
    </ImageBackground>
  );
};

export default FlashCard;
