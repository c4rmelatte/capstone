import Images from "@/constants/images";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

/* ---------------- MOCK DATA ---------------- */
const initialTodos = [
  { id: "1", title: "Read chapter 3", completed: false },
  { id: "2", title: "Assignment Chem", completed: false },
  { id: "3", title: "Lorem ipsum", completed: false },
  { id: "4", title: "Abakada", completed: false },
  { id: "5", title: "Ikaw ang nais maktabi", completed: false },
];

const quickAccess = [
  { id: "1", label: "Flashcard", bgColor: "#4E9C8F" },
  { id: "2", label: "Notes", bgColor: "#5971C0" },
  { id: "3", label: "Music", bgColor: "#EBC176" },
  { id: "4", label: "Pomodoro", bgColor: "#EE8D8D" },
  { id: "5", label: "Todo", bgColor: "#B5A6E4" },
];

const recents = [
  { id: "1", title: "Filipino", count: "10 cards" },
  { id: "2", title: "Science", count: "15 cards" },
  { id: "3", title: "Chemistry", count: "10 cards" },
];

/* ---------------- DASHBOARD ---------------- */
const Dashboard = () => {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const unfinishedCount = todos.filter((t) => !t.completed).length;

  return (
    <ImageBackground source={Images.Dashboard} className="flex-1">
      <StatusBar style="light" />

      {/* MAIN CONTAINER */}
      <View
        className="flex-1"
        style={{
          paddingHorizontal: "5%",
          paddingTop: "15%",
        }}
      >
        {/* ---------------- TO-DO ---------------- */}
        <View style={{ marginBottom: "8%" }}>
          <Text className="text-[#F5CE8E] font-extrabold mb-2 text-xl">TO-DO</Text>

          <View
            style={{
              backgroundColor: "#FFF6E5",
              borderRadius: 20,
              padding: "1%",
              flexDirection: "row",
            }}
          >
            {/* LEFT */}
            <View style={{ width: "30%", position: "relative" }}>
              <LottieView
                source={require("../../../assets/animations/Stuby.json")}
                autoPlay
                loop
                style={{ width: "150%", aspectRatio: 1, marginLeft: "8%" }}
                resizeMode="contain"
              />

              {/* Unfinished counter */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  justifyContent: "flex-start",
                  paddingLeft: "20%",
                }}
              >
                <View
                  style={{
                    width: "25%",
                    aspectRatio: 1,
                    borderRadius: 999,
                    backgroundColor: "#C9B6F3",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text className="text-white font-bold text-sm">{unfinishedCount}</Text>
                </View>

                <Text style={{ marginLeft: 6, color: "#555", fontWeight: "700", fontSize: 12 }}>
                  Unfinished
                </Text>
              </View>
            </View>

            {/* RIGHT */}
            <View style={{ width: "70%", paddingLeft: "20%", marginTop: "5%" }}>
              {todos.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleTodo(item.id)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10%",
                  }}
                >
                  <View
                    style={{
                      width: "6%",
                      aspectRatio: 1,
                      borderRadius: 999,
                      marginRight: "4%",
                      backgroundColor: item.completed ? "#6FAE9A" : "transparent",
                      borderWidth: item.completed ? 0 : 1,
                      borderColor: "#6FAE9A",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.completed && (
                      <View
                        style={{
                          width: "50%",
                          aspectRatio: 1,
                          borderRadius: 999,
                          backgroundColor: "#fff",
                        }}
                      />
                    )}
                  </View>

                  <Text
                    numberOfLines={1}
                    className={`text-sm flex-1 ${
                      item.completed ? "text-gray-400 line-through" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ---------------- QUICK ACCESS ---------------- */}
        <View style={{ marginTop: "5%" }}>
          <Text className="font-bold mb-3 text-black text-lg">Quick Access</Text>

          <View className="flex-row justify-between">
            {quickAccess.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: "16%",
                  aspectRatio: 1,
                  borderRadius: 999,
                  backgroundColor: item.bgColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text className="text-white font-bold text-lg">{item.label[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ---------------- RECENTS ---------------- */}
        <View style={{ marginTop: "5%" }}>
          <Text className="font-bold mb-3 text-black text-lg">Recents</Text>

          {recents.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                backgroundColor: "#F8EBD4",
                borderRadius: 16,
                padding: "5%",
                marginBottom: "5%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "16%",
                  aspectRatio: 1,
                  borderRadius: 12,
                  marginRight: "5%",
                  backgroundColor: "#4E9C8F",
                }}
              />

              <View>
                <Text className="font-bold text-lg">{item.title}</Text>
                <Text className="text-gray-500 text-sm">{item.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Dashboard;
