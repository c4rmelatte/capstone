import AppHeader from "@/components/AppHeader";
import Images from "@/constants/images";
import { usePomodoro } from "@/context/PomodoroContext";
import LottieView from "lottie-react-native";
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

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

export default function Pomodoro() {
  const { mode, secondsLeft, isRunning, setMode, toggle } = usePomodoro();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress = secondsLeft / times[mode];
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <ImageBackground source={Images.PomodoroBg} className="flex-1" resizeMode="cover">
      <AppHeader />

      <View className="flex-1 items-center pt-[10%] ">
        {/* Title */}
        <Text className="text-[36px] font-extrabold text-[#73311D] mb-[5%] tracking-[2px]">
          POMODORO
        </Text>

        <View
          style={{
            width: "80%",
            height: "85%",
            backgroundColor: "#FFF9E5", // inside background
            borderLeftWidth: 10, // thick left border
            borderRightWidth: 10, // thick right border
            borderColor: "#81967A", // green color
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          {/* Tabs */}
          <View className="flex-row justify-between gap-2 mb-[20%]">
            {Object.values(MODE).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setMode(tab)}
                className={`rounded-[10px] px-3 py-1.5 ${
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

          {/* Timer Circle */}
          <View
            className="justify-center items-center mb-[6%]"
            style={{ width: circleSize, height: circleSize }}
          >
            <Svg
              width={circleSize}
              height={circleSize}
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              {/* Background */}
              <Circle
                stroke="#D9D9D9"
                fill="none"
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />
              {/* Progress */}
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

            {/* Image inside circle */}
            <LottieView
              source={
                mode === MODE.POMODORO
                  ? require("../../../assets/animations/Stuby.json")
                  : require("../../../assets/animations/stuby-eating.json")
              }
              style={
                mode === MODE.POMODORO
                  ? { width: "80%", aspectRatio: 1 }
                  : { width: "90%", aspectRatio: 1 }
              }
              resizeMode="contain"
              autoPlay
              loop
            />
          </View>

          {/* Timer text */}
          <Text className="text-[36px] font-bold text-[#3B3B3B] mb-[8%]">
            {formatTime(secondsLeft)}
          </Text>

          {/* Play / Pause */}
          <TouchableOpacity
            className="bg-[#E6D3C3] rounded-[15px] px-[50px] py-3"
            activeOpacity={0.7}
            onPress={toggle}
          >
            <Text className="font-bold text-[18px] text-[#4A3C30]">
              {isRunning ? "PAUSE" : "PLAY"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
