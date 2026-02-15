import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, ImageBackground, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import AppHeader from "../../../components/AppHeader";
import AddFloatingButton from "@/components/AddFloatingButton";
import FlashcardFolderCard from "@/components/FlashcardFolderCard";
import DeleteFlashcardFolderModal from "@/components/DeleteFlashcardFolderModal";
import Images from "@/constants/images";

const { width } = Dimensions.get("window");

export default function FlashcardFolder() {
  const params = useLocalSearchParams();

  const [flashcardFolders, setFlashcardFolders] = useState([
    { id: "1", text: "FlashCard Content 1", image: Images.Slide1 },
    { id: "2", text: "FlashCard Content 2", image: null },
  ]);

  const [popupVisibleFolderId, setPopupVisibleFolderId] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);

  const handleFolderPress = (folderId: string) => {
    router.push({
      pathname: "/flashcard/flashcardItems",
      params: { folderId },
    });
  };

  useEffect(() => {
    if (!params?.id) return;

    setFlashcardFolders((prev) => {
      if (prev.some((folder) => folder.id === params.id)) return prev;

      return [
        {
          id: params.id as string,
          text: params.title as string,
          image: params.coverPhoto ? { uri: params.coverPhoto as string } : null,
        },
        ...prev,
      ];
    });
  }, [params?.id]);

  const confirmDeleteFolder = (folderId: string) => {
    setFolderToDelete(folderId);
    setDeleteModalVisible(true);
  };

  const handleDeleteFolder = () => {
    if (!folderToDelete) return;
    setFlashcardFolders((prev) => prev.filter((folder) => folder.id !== folderToDelete));
    if (popupVisibleFolderId === folderToDelete) setPopupVisibleFolderId(null);
    setFolderToDelete(null);
    setDeleteModalVisible(false);
  };

  const handleEditFolder = (folderId: string) => {
    router.push({
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
              onFolderDelete={() => confirmDeleteFolder(folder.id)}
              onFolderPress={handleFolderPress}
            />
          </View>
        ))}
      </ScrollView>

      <AddFloatingButton
        onPress={() => router.push("/flashcard/createFlashcardFolder")}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteFlashcardFolderModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteFolder}
      />
    </ImageBackground>
  );
}
