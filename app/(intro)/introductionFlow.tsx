import React, { useRef, useState } from "react";
import { Animated, Dimensions, ScrollView, View } from "react-native";

import IntroNextArrow from "../../components/IntroNextArrow";
import IntroDots from "../../components/IntroDots";

import CardIntroduction from "./cardIntroduction";
import NotesIntroduction from "./notesIntroduction";
import MusicIntroduction from "./musicIntroduction";
import PomodoroIntroduction from "./pomodoroIntroduction";
import ToDoIntroduction from "./toDoIntroduction";

const { width } = Dimensions.get("window");

const pages = [
  { key: "card", component: CardIntroduction },
  { key: "notes", component: NotesIntroduction },
  { key: "music", component: MusicIntroduction },
  { key: "pomodoro", component: PomodoroIntroduction },
  { key: "todo", component: ToDoIntroduction },
];

export default function IntroductionFlow() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null!);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: (event: any) => {
              const pageIndex = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setCurrentPage(pageIndex);
            },
          }
        )}
      >
        {pages.map(({ key, component: Page }) => (
          <View key={key} style={{ width, flex: 1 }}>
            <Page />
          </View>
        ))}
      </Animated.ScrollView>

      <IntroDots total={pages.length} scrollX={scrollX} width={width} />
      <IntroNextArrow
        scrollRef={scrollRef}
        page={currentPage}
        totalPages={pages.length}
      />
    </View>
  );
}
