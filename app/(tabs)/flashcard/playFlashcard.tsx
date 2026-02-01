import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import AppHeader from "../../../components/AppHeader";
import Images from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";

export default function PlayFlashcard() {
  const { height, width } = useWindowDimensions();

  // Instruction stays visually, but is NOT counted
  const initialCards = [
    { id: 0, front: "instruction", back: "" },
    { id: 1, front: "What is the chemical symbol for water?", back: "H2O" },
    { id: 2, front: "What is the speed of light?", back: "299,792 km/s" },
    { id: 3, front: "Who discovered gravity?", back: "Isaac Newton" },
  ];

  const realCardsCount = initialCards.length - 1;

  const [cards, setCards] = useState(initialCards);
  const [flipped, setFlipped] = useState(false);

  const cardHeight = height * 0.5;
  const cardWidth = width * 0.8;

  // how many REAL cards have been passed
  const completedCards =
    initialCards.length - cards.length - (cards[0]?.front === "instruction" ? 0 : 1);

  const progress =
    cards[0]?.front === "instruction" ? 0 : completedCards + 1;

  const cardsLeft =
    cards[0]?.front === "instruction" ? realCardsCount : realCardsCount - completedCards;

  const pan = useRef(new Animated.ValueXY()).current;
  const flipAnim = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipCard = () => {
    if (cards[0]?.front === "instruction") return;

    Animated.spring(flipAnim, {
      toValue: flipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    setFlipped(!flipped);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 20,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (Math.abs(gesture.dx) > 100) {
          Animated.timing(pan, {
            toValue: { x: gesture.dx > 0 ? width : -width, y: 0 },
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            setCards((prev) => prev.slice(1));
            setFlipped(false);
            flipAnim.setValue(0);
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <ImageBackground source={Images.FlashcardBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-4">
        <TouchableOpacity className="mr-2">
          <Ionicons name="chevron-back" size={28} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCards(initialCards);
            setFlipped(false);
            flipAnim.setValue(0);
          }}
          className="ml-2 flex-row items-center bg-[#FDE6B1] px-4 py-2 rounded-xl"
        >
          <Ionicons name="reload" size={20} color="#502707" style={{ marginRight: 5 }} />
          <Text className="text-[#502707] font-bold">Restart</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {cards.length > 0 ? (
          <View style={{ height: cardHeight, width: cardWidth }}>
            {cards.slice(1).reverse().map((card, index) => (
              <View
                key={card.id}
                style={{
                  position: "absolute",
                  top: index * 5,
                  left: index * 5,
                  height: cardHeight,
                  width: cardWidth,
                  backgroundColor: "#FFF9EC",
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  elevation: 3,
                }}
              />
            ))}

            <Animated.View
              {...panResponder.panHandlers}
              style={{
                transform: [
                  ...pan.getTranslateTransform(),
                  {
                    rotate: pan.x.interpolate({
                      inputRange: [-width, 0, width],
                      outputRange: ["-15deg", "0deg", "15deg"],
                    }),
                  },
                ],
                height: cardHeight,
                width: cardWidth,
              }}
            >
              <TouchableOpacity activeOpacity={1} onPress={flipCard} style={{ flex: 1 }}>
                {/* Front */}
                <Animated.View
                  style={{
                    position: "absolute",
                    backfaceVisibility: "hidden",
                    backgroundColor: "#FFF9EC",
                    height: cardHeight,
                    width: cardWidth,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: width * 0.05,
                    transform: [{ rotateY: frontInterpolate }],
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 5,
                  }}
                >
                  {cards[0].front === "instruction" ? (
                    <Text className="text-center">
                      <Text className="text-lg font-semibold text-[#A57C00]">
                        Instruction:{"\n"}
                        Tap the card to see the answer.{"\n"}
                        Swipe left or right to move to the next one!
                      </Text>
                      {"\n\n\n\n\n\n"}
                      <Text className="text-xl font-extrabold text-[#39675F]">
                        Swipe to start!
                      </Text>
                    </Text>
                  ) : (
                    <>
                      <Text className="text-2xl font-bold text-[#39675F] mb-2">
                        Question
                      </Text>
                      <Text className="text-xl font-semibold text-center text-[#502707]">
                        {cards[0].front}
                      </Text>
                    </>
                  )}
                </Animated.View>

                {/* Back */}
                <Animated.View
                  style={{
                    position: "absolute",
                    backfaceVisibility: "hidden",
                    backgroundColor: "#FDE6B1",
                    height: cardHeight,
                    width: cardWidth,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: width * 0.05,
                    transform: [{ rotateY: backInterpolate }],
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 5,
                  }}
                >
                  {cards[0].front !== "instruction" && (
                    <>
                      <Text className="text-2xl font-bold text-[#39675F] mb-2">
                        Answer
                      </Text>
                      <Text className="text-xl font-semibold text-center text-[#502707]">
                        {cards[0].back}
                      </Text>
                    </>
                  )}
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          <Text className="text-3xl font-bold text-[#FDE6B1] mt-10">
            No more cards!
          </Text>
        )}
      </View>

      {/* Progress */}
      <View
        style={{
          width: width * 0.8,
          height: 10,
          backgroundColor: "#ccc",
          borderRadius: 5,
          alignSelf: "center",
          marginBottom: 5,
        }}
      >
        <View
          style={{
            width: `${(progress / realCardsCount) * 100}%`,
            height: 10,
            backgroundColor: "#FDE6B1",
            borderRadius: 5,
          }}
        />
      </View>

      <Text className="text-[#FDE6B1] text-center mb-20">
        {cardsLeft}/{realCardsCount} cards left
      </Text>
    </ImageBackground>
  );
}
