    import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export interface Todo {
  id: string;
  task: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  index: number;
  toggleDone: (id: string) => void;
}

const pastelColors: string[] = ["#FFD7BA", "#BAE1FF", "#D3FFC4", "#FFF1BA", "#E6BAFF"];

const TodoItem: React.FC<TodoItemProps> = ({ todo, index, toggleDone }) => {
  const bgColor = pastelColors[index % pastelColors.length];

  return (
    <View className="flex-row items-center p-4 mb-3 rounded-xl w-full" style={{ backgroundColor: bgColor }}>
      <TouchableOpacity
        onPress={() => toggleDone(todo.id)}
        className="w-6 h-6 mr-4 rounded-full border-2 items-center justify-center"
        style={{
          borderColor: todo.done ? "#4CAF50" : "#999",
          backgroundColor: todo.done ? "#4CAF50" : "transparent",
        }}
      >
        {todo.done && <View className="w-3 h-3 rounded-full bg-white" />}
      </TouchableOpacity>

      <Text className={`text-base flex-1 ${todo.done ? "line-through text-gray-700" : "text-gray-800"}`}>
        {todo.task}
      </Text>
    </View>
  );
};

export default TodoItem;
