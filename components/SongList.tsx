import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface Song {
  id: string;
  title: string;
  duration?: number;
}

interface Props {
  songs: Song[];
  currentId: string;
  onSelect: (id: string) => void;
}

export default function SongList({ songs, currentId, onSelect }: Props) {
  const formatDuration = (ms?: number) => {
    if (!ms) return "0:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (songs.length === 0) {
    return (
      <View className="bg-[#E6DFC9] rounded-b-3xl px-6 pb-8 flex-1 justify-center items-center">
        <Text className="text-lg font-semibold text-black/60">
          🎵 Add songs in this playlist
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-[#E6DFC9] rounded-b-3xl px-6 pb-8" style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {songs.map((song) => {
          const isActive = currentId === song.id;

          return (
            <TouchableOpacity
              key={song.id}
              onPress={() => onSelect(song.id)}
              className="py-4 flex-row justify-between items-center border-b border-black/20"
            >
              <View>
                <Text
                  className={`text-base font-semibold ${
                    isActive ? "text-[#7C5CFF]" : "text-black"
                  }`}
                >
                  {song.title}
                </Text>

                <Text
                  className={`text-sm ${
                    isActive ? "text-[#7C5CFF]" : "text-black/60"
                  }`}
                >
                  {formatDuration(song.duration)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
