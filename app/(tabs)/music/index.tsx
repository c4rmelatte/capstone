import MusicFolderCard from "@/components/MusicFolderCard";
import Images from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import AppHeader from "../../../components/AppHeader";
import DeletePlaylistModal from "../../../components/DeletePlaylistModal"; // <-- import modal

const { width } = Dimensions.get("window");

export default function Music() {
  const params = useLocalSearchParams();

  // Enable LayoutAnimation on Android
  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [originalFolders, setOriginalFolders] = useState([
    {
      id: "1",
      musicFolderTitle: "Upbeat",
      musicImage: Images.MusicUpbeat,
      totalSongs: 10,
      totalStreamingMinutes: "32 min",
    },
    {
      id: "2",
      musicFolderTitle: "Classical",
      musicImage: Images.MusicClassical,
      totalSongs: 20,
      totalStreamingMinutes: "45 min 15 s",
      
    },
    {
      id: "3",
      musicFolderTitle: "Pop",
      musicImage: Images.MusicPop,
      totalSongs: 10,
      totalStreamingMinutes: "31 min",
    },
    {
      id: "4",
      musicFolderTitle: "Nature",
      musicImage: Images.MusicNature,
      totalSongs: 10,
      totalStreamingMinutes: "31 min",
    },
    {
      id: "5",
      musicFolderTitle: "Lofi",
      musicImage: Images.MusicLofi,
      totalSongs: 10,
      totalStreamingMinutes: "31 min",
    },
  ]);

  const [musicFolders, setMusicFolders] = useState(
    originalFolders.map((f) => ({ ...f, isHearted: false }))
  );

  const [popupVisibleFolderId, setPopupVisibleFolderId] = useState<string | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null); // <-- folder pending deletion

  const handleFolderPress = (musicFolderId: string) => {
    console.log("Folder pressed:", musicFolderId);
  };

  // ADD NEW MUSIC FOLDER ON TOP IF PARAMS ID EXISTS
  useEffect(() => {
    if (!params?.id) return;

    setOriginalFolders((prev) => {
      if (prev.some((f) => f.id === params.id)) return prev;

      return [
        {
          id: params.id as string,
          musicFolderTitle: params.title as string,
          musicImage: params.coverPhoto ? { uri: params.coverPhoto as string } : null,
          totalSongs: 0,
          totalStreamingMinutes: "0 min",
        },
        ...prev,
      ];
    });

    setMusicFolders((prev) => {
      if (prev.some((f) => f.id === params.id)) return prev;

      return [
        {
          id: params.id as string,
          musicFolderTitle: params.title as string,
          musicImage: params.coverPhoto ? { uri: params.coverPhoto as string } : null,
          totalSongs: 0,
          totalStreamingMinutes: "0 min",
          isHearted: false,
        },
        ...prev,
      ];
    });
  }, [params?.id]);

  // DELETE MUSIC FOLDER
  const handleDeleteFolder = (musicFolderId: string) => {
    setMusicFolders((prev) => prev.filter((f) => f.id !== musicFolderId));
    setOriginalFolders((prev) => prev.filter((f) => f.id !== musicFolderId));
    setFolderToDelete(null);
    if (popupVisibleFolderId === musicFolderId) setPopupVisibleFolderId(null);
  };

  // Open modal for folder deletion
  const confirmDeleteFolder = (musicFolderId: string) => {
    setFolderToDelete(musicFolderId);
  };

  // EDIT MUSIC FOLDER
  const handleEditFolder = (musicFolderId: string) => {
    router.push({
      pathname: "/music/updateMusicFolder",
      params: { editId: musicFolderId },
    });
    setPopupVisibleFolderId(null);
  };

  // HEART / UNHEART FOLDER WITH ORIGINAL ORDER + ANIMATION
  const toggleHeartFolder = (musicFolderId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setMusicFolders((prev) => {
      const updated = prev.map((f) =>
        f.id === musicFolderId ? { ...f, isHearted: !f.isHearted } : f
      );

      const hearted = updated.filter((f) => f.isHearted);
      const unhearted = updated.filter((f) => !f.isHearted);

      const unheartedOrdered = originalFolders
        .filter((f) => unhearted.some((uf) => uf.id === f.id))
        .map((f) => ({ ...f, isHearted: false }));

      return [...hearted, ...unheartedOrdered];
    });
  };

  return (
    <ImageBackground source={Images.MusicBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      <Text
        className="text-[#FDE6B1] mt-8 mb-8 text-4xl font-[900] text-center tracking-[4px]"
        style={{
          textShadowColor: "rgba(0, 0, 0, 0.4)",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 4,
        }}
      >
        Music
      </Text>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {musicFolders.map((folder) => (
          <View
            key={folder.id}
            className="overflow-hidden rounded-2xl shadow-md mb-4"
            style={{ width: width * 0.9, height: 130 }}
          >
            <MusicFolderCard
              musicFolderId={folder.id}
              musicFolderTitle={folder.musicFolderTitle}
              musicImage={folder.musicImage}
              totalSongs={folder.totalSongs}
              totalStreamingMinutes={folder.totalStreamingMinutes}
              isPopupVisible={popupVisibleFolderId === folder.id}
              setPopupVisibleFolder={setPopupVisibleFolderId}
              onFolderEdit={handleEditFolder}
              onFolderDelete={() => confirmDeleteFolder(folder.id)} // <-- open modal
              onFolderPress={handleFolderPress}
              isHearted={folder.isHearted}
              onHeartToggle={() => toggleHeartFolder(folder.id)}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.9}
        className="absolute bottom-8 right-8 w-[65px] h-[65px] bg-[#EFE2B6] rounded-full justify-center items-center shadow-xl"
        onPress={() => router.push("/(tabs)/music/createMusicFolder")}
      >
        <Ionicons name="add" size={40} color="#2E2A25" />
      </TouchableOpacity>

      {/* Delete Playlist Modal */}
      <DeletePlaylistModal
        visible={!!folderToDelete}
        onCancel={() => setFolderToDelete(null)}
        onConfirm={() => {
          if (folderToDelete) handleDeleteFolder(folderToDelete);
        }}
      />
    </ImageBackground>
  );
}
