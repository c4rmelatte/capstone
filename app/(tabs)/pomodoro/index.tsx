import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { router } from "expo-router";
import Images from "@/constants/images";

const { width } = Dimensions.get("window");
const circleSize = width * 0.6;
const strokeWidth = 10;
const radius = (circleSize - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const MODE = {
  POMODORO: "Pomodoro",
  SHORT_BREAK: "Short Break",
  LONG_BREAK: "Long Break",
} as const;

const times = {
  [MODE.POMODORO]: 25 * 60,
  [MODE.SHORT_BREAK]: 5 * 60,
  [MODE.LONG_BREAK]: 15 * 60,
};

const Pomodoro = () => {
  const [mode, setMode] = useState<typeof MODE[keyof typeof MODE]>(MODE.POMODORO);
  const [secondsLeft, setSecondsLeft] = useState(times[MODE.POMODORO]);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  // Reset timer when mode changes
  useEffect(() => {
    setSecondsLeft(times[mode]);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress = secondsLeft / times[mode];
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <ImageBackground
      source={Images.PomodoroBg}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 items-center pt-[15%] px-[10%]">
        {/* Title */}
        <Text className="text-[36px] font-extrabold text-[#1D1D1D] mb-[5%] tracking-[2px]">
          POMODORO
        </Text>

        {/* Tabs */}
        <View className="flex-row justify-between w-[80%] mb-[7%]">
          {Object.values(MODE).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setMode(tab)}
              className={`rounded-[12px] px-3 py-1.5 ${
                mode === tab ? "bg-[#B39287]" : "bg-[#E6D3C3]"
              }`}
              activeOpacity={0.8}
            >
              <Text
                className={`text-[14px] font-bold ${
                  mode === tab ? "text-[#2C1F16]" : "text-[#7A6654]"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Timer circle with progress ring */}
        <View
          style={{
            width: circleSize,
            height: circleSize,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "6%",
          }}
        >
          <Svg
            width={circleSize}
            height={circleSize}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {/* Background circle */}
            <Circle
              stroke="#D9D9D9"
              fill="none"
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <Circle
              stroke="#A8B6A5"
              fill="none"
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              originX={circleSize / 2}
              originY={circleSize / 2}
            />
          </Svg>

          {/* Image inside ring */}
          <Image
            source={Images.Puset}
            className="w-[60%] h-[60%]"
            resizeMode="contain"
          />
        </View>

        {/* Timer text */}
        <Text className="text-[36px] font-bold text-[#3B3B3B] mb-[8%]">
          {formatTime(secondsLeft)}
        </Text>

        {/* Play/Pause button */}
        <TouchableOpacity
          className="bg-[#E6D3C3] rounded-[15px] px-[50px] py-3"
          activeOpacity={0.7}
          onPress={() => setIsRunning((prev) => !prev)}
        >
          <Text className="font-bold text-[18px] text-[#4A3C30]">
            {isRunning ? "PAUSE" : "PLAY"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Pomodoro;
