import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router"; // <-- import router
import Images from "@/constants/images";

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
        setTodos(prev =>
            prev.map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const unfinishedCount = todos.filter(t => !t.completed).length;

    return (
        <ImageBackground
            source={Images.Dashboard}
            className="flex-1"
            resizeMode="cover"
        >
            <StatusBar style="light" />

            <View className="flex-1 px-5 pt-20">
                {/* ---------------- TO-DO CARD ---------------- */}
                <View className="mb-10">
                    <Text className="text-[#F5CE8E] font-extrabold mb-2 text-xl tracking-wide">
                        TO-DO
                    </Text>

                    <View className="bg-[#FFF6E5] rounded-2xl px-5 py-5 flex-row">
                        <View className="w-28 items-center">
                            <Image
                                source={Images.Puset}
                                className="w-24 h-24"
                                resizeMode="contain"
                            />

                            <View className="flex-row items-center mt-8">
                                <View className="bg-[#C9B6F3] w-7 h-7 rounded-full items-center justify-center">
                                    <Text className="text-white font-bold text-sm">
                                        {unfinishedCount}
                                    </Text>
                                </View>
                                <Text className="ml-2 text-gray-700 text-sm">Unfinished</Text>
                            </View>
                        </View>

                        <View className="flex-1 pl-16">
                            {todos.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.7}
                                    onPress={() => toggleTodo(item.id)}
                                    className="flex-row items-center mb-3"
                                >
                                    {/* CHECK CIRCLE */}
                                    <View
                                        className={`w-5 h-5 rounded-full mr-3 items-center justify-center ${
                                            item.completed ? "bg-[#6FAE9A]" : "border border-[#6FAE9A]"
                                        }`}
                                    >
                                        {item.completed && (
                                            <View className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                    </View>

                                    {/* TASK TEXT */}
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
                <View className="mb-8 mt-8">
                    <Text className="font-bold mb-3 text-black text-lg">Quick Access</Text>
                    <View className="flex-row justify-between">
                        {quickAccess.map(item => (
                            <TouchableOpacity
                                key={item.id} // <-- added key
                                activeOpacity={0.8}
                                style={{ backgroundColor: item.bgColor }}
                                className="w-14 h-14 rounded-full items-center justify-center"
                                onPress={() => {
                                    if(item.label === "Pomodoro") {
                                       // router.push("/(tabs)/pomodoro");
                                    } else {
                                        console.log(`${item.label} pressed`);
                                    }
                                }}
                            >
                                <Text className="text-white font-bold text-lg">
                                    {item.label[0]}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* ---------------- RECENTS CONTAINER ---------------- */}
                <View className="mb-6">
                    <Text className="font-bold mb-3 text-black text-lg">Recents</Text>
                    {recents.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.8}
                            className="bg-[#F8EBD4] rounded-xl p-5 mb-4 flex-row items-center"
                        >
                            <View className="w-14 h-14 bg-[#4E9C8F] rounded-lg mr-4" />
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
