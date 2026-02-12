// Music.tsx
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
import DeletePlaylistModal from "../../../components/DeletePlaylistModal";
import { Audio } from "expo-av";

const { width } = Dimensions.get("window");

// Example song database
const songsByFolder: Record<string, any[]> = {
  "1": [
    { id: "u1", title: "Energy Boost", file: require("../../../assets/music/pop1.mp3") },
    { id: "u2", title: "Morning Run", file: require("../../../assets/music/pop2.mp3") },
  ],
  "2": [
    { id: "c1", title: "Moonlight Sonata", file: require("../../../assets/music/pop1.mp3") },
    { id: "c2", title: "Nocturne Op.9", file: require("../../../assets/music/pop2.mp3") },
  ],
  "3": [
    { id: "p1", title: "Pop Hit 1", file: require("../../../assets/music/pop1.mp3") },
    { id: "p2", title: "Pop Hit 2", file: require("../../../assets/music/pop2.mp3") },
  ],
  "4": [
    { id: "n1", title: "Rain Sounds", file: require("../../../assets/music/pop1.mp3") },
    { id: "n2", title: "Forest Ambience", file: require("../../../assets/music/pop2.mp3") },
  ],
  "5": [
    { id: "l1", title: "Lofi Chill", file: require("../../../assets/music/pop1.mp3") },
  ],
};

export default function Music() {
  const params = useLocalSearchParams();

  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [originalFolders, setOriginalFolders] = useState<any[]>([]);
  const [musicFolders, setMusicFolders] = useState<any[]>([]);
  const [popupVisibleFolderId, setPopupVisibleFolderId] = useState<string | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);

  // Helper to compute folder stats
  const computeFolderStats = async (folderId: string) => {
    const songs = songsByFolder[folderId] || [];
    let totalDuration = 0;

    for (const song of songs) {
      const { sound, status } = await Audio.Sound.createAsync(song.file);
      totalDuration += status.isLoaded ? status.durationMillis ?? 0 : 0;
      await sound.unloadAsync();
    }

    const minutes = Math.floor(totalDuration / 1000 / 60);
    return { totalSongs: songs.length, totalStreamingMinutes: `${minutes} min` };
  };

  // Initialize folders dynamically
  useEffect(() => {
    const initFolders = async () => {
      const folderIds = ["1", "2", "3", "4", "5"];
      const folderTitles = ["Upbeat", "Classical", "Pop", "Nature", "Lofi"];
      const folderImages = [Images.MusicUpbeat, Images.MusicClassical, Images.MusicPop, Images.MusicNature, Images.MusicLofi];

      const folders = [];

      for (let i = 0; i < folderIds.length; i++) {
        const stats = await computeFolderStats(folderIds[i]);
        folders.push({
          id: folderIds[i],
          musicFolderTitle: folderTitles[i],
          musicImage: folderImages[i],
          totalSongs: stats.totalSongs,
          totalStreamingMinutes: stats.totalStreamingMinutes,
        });
      }

      setOriginalFolders(folders);
      setMusicFolders(folders.map((f) => ({ ...f, isHearted: false })));
    };

    initFolders();
  }, []);

  /* ---------------- HANDLE FOLDER PRESS ---------------- */
  const handleFolderPress = (id: string, title: string) => {
    router.push({
      pathname: "/music/playlist",
      params: { id, title },
    });
  };

  /* ---------------- CREATE NEW FOLDER ---------------- */
useEffect(() => {
  if (!params?.id) return;
  if (originalFolders.length === 0) return; // wait until folders are loaded

  const folderExists = originalFolders.some((f) => f.id === params.id);
  if (folderExists) return;

  // New folder stats
  const newFolder = {
    id: params.id as string,
    musicFolderTitle: params.title as string,
    musicImage: params.coverPhoto ? { uri: params.coverPhoto as string } : Images.MusicDefault,
    totalSongs: 0, // empty folder initially
    totalStreamingMinutes: "0 min",
  };

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  // Add to state
  setOriginalFolders((prev) => [newFolder, ...prev]);
  setMusicFolders((prev) => [{ ...newFolder, isHearted: false }, ...prev]);
}, [params, originalFolders]);


  /* ---------------- DELETE ---------------- */
  const handleDeleteFolder = (id: string) => {
    setMusicFolders((prev) => prev.filter((f) => f.id !== id));
    setOriginalFolders((prev) => prev.filter((f) => f.id !== id));
    setFolderToDelete(null);
  };

  /* ---------------- HEART SYSTEM ---------------- */
  const toggleHeartFolder = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setMusicFolders((prev) => {
      const updated = prev.map((f) =>
        f.id === id ? { ...f, isHearted: !f.isHearted } : f
      );

      const hearted = updated.filter((f) => f.isHearted);
      const unhearted = updated.filter((f) => !f.isHearted);

      const orderedUnhearted = originalFolders
        .filter((orig) => unhearted.some((u) => u.id === orig.id))
        .map((orig) => ({ ...orig, isHearted: false }));

      return [...hearted, ...orderedUnhearted];
    });
  };

  /* ---------------- RENDER ---------------- */
  return (
    <ImageBackground source={Images.MusicBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      <Text className="text-[#FDE6B1] mt-8 mb-8 text-4xl font-[900] text-center tracking-[4px]">
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
              onFolderDelete={() => setFolderToDelete(folder.id)}
              onFolderPress={() =>
                handleFolderPress(folder.id, folder.musicFolderTitle)
              }
              isHearted={folder.isHearted}
              onHeartToggle={() => toggleHeartFolder(folder.id)}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-8 right-8 w-[65px] h-[65px] bg-[#EFE2B6] rounded-full justify-center items-center"
        onPress={() => router.push("/(tabs)/music/createMusicFolder")}
      >
        <Ionicons name="add" size={40} color="#2E2A25" />
      </TouchableOpacity>

      <DeletePlaylistModal
        visible={!!folderToDelete}
        onCancel={() => setFolderToDelete(null)}
        onConfirm={() => folderToDelete && handleDeleteFolder(folderToDelete)}
      />
    </ImageBackground>
  );
}
