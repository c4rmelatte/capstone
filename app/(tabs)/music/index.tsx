import MusicFolderCard from "@/components/MusicFolderCard";
import Images from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

// Import the single source of truth
import { songsByFolder } from "./playlist";

const { width } = Dimensions.get("window");

export default function Music() {
  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [musicFolders, setMusicFolders] = useState<any[]>([]);
  const [popupVisibleFolderId, setPopupVisibleFolderId] = useState<string | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);

  /* ---------------- HELPER TO COMPUTE DURATION ---------------- */
  const getTotalDuration = async (songs: any[]) => {
    let totalDuration = 0;
    for (const song of songs) {
      const { sound, status } = await Audio.Sound.createAsync(song.file);
      totalDuration += status.isLoaded ? status.durationMillis ?? 0 : 0;
      await sound.unloadAsync();
    }
    const minutes = Math.floor(totalDuration / 1000 / 60);
    return `${minutes} min`;
  };

  const computeFolderStats = async (folderId: string) => {
    const songs = folderId === "all" ? Object.values(songsByFolder).flat() : songsByFolder[folderId] || [];
    const totalStreamingMinutes = await getTotalDuration(songs);
    return { totalSongs: songs.length, totalStreamingMinutes };
  };

  /* ---------------- INITIALIZE FOLDERS ---------------- */
  useEffect(() => {
    const initFolders = async () => {
      const folderIds = ["1", "2", "3", "4", "5"];
      const folderTitles = ["Upbeat", "Classical", "Pop", "Nature", "Lofi"];
      const folderImages = [
        Images.MusicUpbeat,
        Images.MusicClassical,
        Images.MusicPop,
        Images.MusicNature,
        Images.MusicLofi,
      ];

      const folders: any[] = [];

      for (let i = 0; i < folderIds.length; i++) {
        const stats = await computeFolderStats(folderIds[i]);
        folders.push({
          id: folderIds[i],
          musicFolderTitle: folderTitles[i],
          musicImage: folderImages[i],
          totalSongs: stats.totalSongs,
          totalStreamingMinutes: stats.totalStreamingMinutes,
          isHearted: false,
        });
      }

      // All Songs folder
      const allStats = await computeFolderStats("all");
      const allSongsFolder = {
        id: "all",
        musicFolderTitle: "All Songs",
        musicImage: Images.MusicDefault,
        totalSongs: allStats.totalSongs,
        totalStreamingMinutes: allStats.totalStreamingMinutes,
        isHearted: false,
      };

      setMusicFolders([allSongsFolder, ...folders]);
    };

    initFolders();
  }, []);

  

  /* ---------------- DELETE ---------------- */
  const handleDeleteFolder = (id: string) => {
    if (id === "all") return; // cannot delete All Songs
    setMusicFolders((prev) => prev.filter((f) => f.id !== id));
    setFolderToDelete(null);
  };

  /* ---------------- HEART ---------------- */
  const toggleHeartFolder = (id: string) => {
    if (id === "all") return; // All Songs has no heart

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setMusicFolders((prev) => {
      const updated = prev.map((f) =>
        f.id === id ? { ...f, isHearted: !f.isHearted } : f
      );

      const allSongs = updated.find((f) => f.id === "all");
      const hearted = updated.filter((f) => f.isHearted);
      const unhearted = updated.filter((f) => !f.isHearted && f.id !== "all");

      return [allSongs!, ...hearted, ...unhearted];
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
  setPopupVisibleFolder={folder.id === "all" ? () => {} : setPopupVisibleFolderId} 
  onFolderDelete={() => setFolderToDelete(folder.id)}
  onFolderPress={() =>
    router.push({
      pathname: "/music/playlist",
      params: { id: folder.id, title: folder.musicFolderTitle },
    })
  }
  isHearted={folder.isHearted}
  onHeartToggle={() => toggleHeartFolder(folder.id)}
  hideHeart={folder.id === "all"} // hide heart for All Songs
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
