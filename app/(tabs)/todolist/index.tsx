import GreenButton from "@/components/GreenButton";
import Images from "@/constants/images";
import { StatusBar } from "expo-status-bar";
import { Plus, SquarePen, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import AddFloatingButton from "@/components/AddFloatingButton";

import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Todo {
  id: string;
  task: string;
  done: boolean;
}

const pastelColors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#E0BAFF"];

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", task: "Learn React Native", done: false },
    { id: "2", task: "Build a TODO app", done: false },
    { id: "3", task: "Tap text to edit", done: false },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ---------- Actions ---------- */

  //pag ciniclick ung to do item para maedit
  const toggleDone = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTask = (id: string, text: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, task: text } : t)));
  };

  const addTodoItem = () => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      task: "New Task",
      done: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setEditingId(newTodo.id);
  };

  /* ---------- Render ---------- */

  return (
    <ImageBackground source={Images.TodoBg} resizeMode="cover" className="flex-1">
      <StatusBar style="dark" />

      {/* MAIN CONTAINER */}
      <View className="flex-1 px-4 sm:px-8 pt-[15%]">
        {/* TITLE */}
        <Text className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6 text-center">
          TO-DO LIST
        </Text>

        {/* EDIT / SAVE (FIXED HEIGHT — NO JUMP) */}
        <View className="flex-row w-full justify-end items-center h-12 mb-4">
          {!isEditing ? (
            <TouchableOpacity className="mr-[2%]" onPress={() => setIsEditing(true)}>
              <SquarePen size={28} color="#4B5563" />
            </TouchableOpacity>
          ) : (
            <GreenButton
              title="Save"
              onPress={() => setIsEditing(false)}
              widthPercent={0.2}
              heightPercent={0.05}
            />
          )}
        </View>

        {/* LIST (KEYBOARD ONLY AFFECTS THIS) */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const pastelColor = pastelColors[index % pastelColors.length];

              return (
                <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-2 shadow">
                  {/* DONE */}
                  <TouchableOpacity
                    onPress={() => toggleDone(item.id)}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 items-center justify-center"
                  >
                    {item.done && (
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 9,
                          backgroundColor: pastelColor,
                        }}
                      />
                    )}
                  </TouchableOpacity>

                  {/* TEXT / INPUT */}
                  {editingId === item.id ? (
                    <TextInput
                      value={item.task}
                      autoFocus
                      onChangeText={(text) => updateTask(item.id, text)}
                      onBlur={() => setEditingId(null)}
                      className="flex-1 text-gray-900 border-b border-gray-300 px-1 py-0.5"
                    />
                  ) : (
                    <TouchableOpacity
                      className="flex-1"
                      onPress={() => setEditingId(item.id)}
                      activeOpacity={0.7}
                    >
                      <Text
                        className={`text-gray-900 ${item.done ? "line-through text-gray-400" : ""}`}
                      >
                        {item.task}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* DELETE (ONLY IN EDIT MODE) */}
                  {isEditing && (
                    <TouchableOpacity onPress={() => deleteTodo(item.id)} className="ml-2">
                      <Trash2 size={21} color="red" />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </KeyboardAvoidingView>
      </View>

      {/* FLOATING ADD BUTTON */}
<AddFloatingButton onPress={addTodoItem} />

    </ImageBackground>
  );
};

export default ToDo;
