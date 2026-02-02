import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, ImageBackground, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import AppHeader from "../../../components/AppHeader";
import AddFloatingButton from "@/components/AddFloatingButton";
import FlashcardFolderCard from "@/components/FlashcardFolderCard";
import Images from "@/constants/images";

const { width } = Dimensions.get("window");

export default function FlashcardFolder() {
  const params = useLocalSearchParams();

  const [flashcardFolders, setFlashcardFolders] = useState([
    { id: "1", text: "FlashCard Content 1", image: Images.Slide1 },
    { id: "2", text: "FlashCard Content 2", image: null },
  ]);

  // Which folder's popup is currently open
  const [popupVisibleFolderId, setPopupVisibleFolderId] = useState<string | null>(null);

  const handleFolderPress = (folderId: string) => {
    console.log("Folder pressed:", folderId);
    // navigate to folder cards
  };

  // ADD NEW FLASHCARD FOLDER ON TOP
  useEffect(() => {
    if (!params?.id) return;

    setFlashcardFolders((prev) => {
      if (prev.some((folder) => folder.id === params.id)) return prev;

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

  // DELETE FLASHCARD FOLDER
  const handleDeleteFolder = (folderId: string) => {
    setFlashcardFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    if (popupVisibleFolderId === folderId) setPopupVisibleFolderId(null);
  };

  // EDIT FLASHCARD FOLDER
  const handleEditFolder = (folderId: string) => {
    router.replace({
      pathname: "/flashcard/updateFlashcardFolder",
      params: { editId: folderId },
    });
    setPopupVisibleFolderId(null);
  };

  return (
    <ImageBackground source={Images.FlashcardBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      <Text
        className="text-[#FDE6B1] mt-8 mb-8 text-4xl font-[900] text-center tracking-[4px]"
        style={{
          textShadowColor: "rgba(0, 0, 0, 0.4)",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 4,
        }}
      >
        FLASHCARD
      </Text>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {flashcardFolders.map((folder) => (
          <View
            key={folder.id}
            className="overflow-hidden rounded-2xl shadow-md mb-4"
            style={{ width: width * 0.9, height: 180 }}
          >
            <FlashcardFolderCard
              folderId={folder.id}
              text={folder.text}
              image={folder.image}
              isPopupVisible={popupVisibleFolderId === folder.id}
              setPopupVisibleFolder={setPopupVisibleFolderId}
              onFolderEdit={handleEditFolder}
              onFolderDelete={handleDeleteFolder}
              onFolderPress={handleFolderPress}
            />
          </View>
        ))}
      </ScrollView>

      <AddFloatingButton
        onPress={() => router.replace("/flashcard/createFlashcardFolder")}
      />
    </ImageBackground>
  );
}
