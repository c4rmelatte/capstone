import Images from "@/constants/images";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Pencil } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../../components/AppHeader";
import PlayerCard from "../../../components/PlayerCard";
import SongList from "../../../components/SongList";

export default function Playlist() {
  const params = useLocalSearchParams();

  const folderId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const folderTitle = Array.isArray(params?.title)
    ? params.title[0]
    : params?.title ?? "Playlist";

  /* ================= SONG DATABASE ================= */

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

  const songs = folderId && songsByFolder[folderId]
    ? songsByFolder[folderId]
    : [];

  /* ================= PLAYER STATE ================= */

  const soundRef = useRef<Audio.Sound | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [songDurations, setSongDurations] = useState<number[]>([]);

  const repeatRef = useRef(isRepeat);
  useEffect(() => {
    repeatRef.current = isRepeat;
  }, [isRepeat]);

  /* ================= FORMAT TOTAL TIME ================= */

  const formatTotalDuration = (ms: number) => {
    if (!ms) return "0 min";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) return `${seconds} sec`;
    if (seconds === 0) return `${minutes} min`;

    return `${minutes} min ${seconds} sec`;
  };

  const totalDurationMillis = songDurations.reduce((a, b) => a + b, 0);
  const formattedTotalDuration = formatTotalDuration(totalDurationMillis);

  /* ================= LOAD SONG ================= */

  const loadSong = async (index: number, autoPlay = true) => {
    if (songs.length === 0) return;

    if (soundRef.current) await soundRef.current.unloadAsync();

    const { sound } = await Audio.Sound.createAsync(
      songs[index].file,
      { shouldPlay: autoPlay },
      (status: any) => {
        if (!status.isLoaded) return;

        setDuration(status.durationMillis || 0);
        setPosition(status.positionMillis || 0);
        setIsPlaying(status.isPlaying);

        if (status.didJustFinish) {
          if (repeatRef.current) {
            loadSong(index);
          } else {
            autoNext(index);
          }
        }
      }
    );

    soundRef.current = sound;
    setCurrentIndex(index);
  };

  /* ================= AUTO NEXT ================= */

  const autoNext = (index: number) => {
    if (songs.length === 0) return;

    let nextIndex = index;

    if (isShuffle && songs.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === index);
    } else {
      nextIndex = index + 1;
      if (nextIndex >= songs.length) nextIndex = 0;
    }

    loadSong(nextIndex);
  };

  /* ================= CONTROLS ================= */

  const handlePlayPause = async () => {
    if (!soundRef.current || songs.length === 0) return;

    if (isPlaying) await soundRef.current.pauseAsync();
    else await soundRef.current.playAsync();
  };

  const handleNext = () => autoNext(currentIndex);

  const handlePrev = () => {
    if (songs.length === 0) return;

    const prevIndex =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;

    loadSong(prevIndex);
  };

  const handleSeek = async (millis: number) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(millis);
  };

  /* ================= PRELOAD DURATIONS ================= */

  useEffect(() => {
    if (songs.length === 0) {
      setSongDurations([]);
      return;
    }

    const preloadDurations = async () => {
      const durations: number[] = [];

      for (const song of songs) {
        const { sound, status } = await Audio.Sound.createAsync(song.file);
        durations.push(status.isLoaded ? status.durationMillis ?? 0 : 0);
        await sound.unloadAsync();
      }

      setSongDurations(durations);
    };

    preloadDurations();
    loadSong(0, false);

    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, [folderId]);

  /* ================= UI ================= */

  return (
    <ImageBackground source={Images.MusicBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      {/* HEADER */}
      <View className="flex-row items-center justify-between px-6 mt-7 mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-4xl font-bold text-[#FDE6B1] text-center flex-1">
          {folderTitle}
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push(`/music/updateMusicFolder?editId=${folderId}`)
          }
        >
          <Pencil size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View className="mx-6 mt-6" style={{ height: "75%" }}>
        <PlayerCard
          image={Images.MusicClassical}
          folderTitle={folderTitle}
          totalSongs={songs.length}
          totalDuration={formattedTotalDuration}
          currentTitle={
            songs.length === 0
              ? "No songs yet"
              : songs[currentIndex]?.title
          }
          duration={duration}
          position={position}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          isShuffle={isShuffle}
          isRepeat={isRepeat}
          onSeek={handleSeek}
          onToggleShuffle={() => setIsShuffle(!isShuffle)}
          onToggleRepeat={() => setIsRepeat(!isRepeat)}
        />

        <SongList
          songs={songs.map((s, i) => ({
            ...s,
            duration: songDurations[i],
          }))}
          currentId={songs[currentIndex]?.id || ""}
          onSelect={(id) => {
            const index = songs.findIndex((s) => s.id === id);
            if (index !== -1) loadSong(index);
          }}
        />
      </View>
    </ImageBackground>
  );
}
