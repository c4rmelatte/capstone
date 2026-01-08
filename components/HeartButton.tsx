import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const HeartButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setLiked(!liked)}
      className="absolute top-5 right-5 w-9 h-9 bg-white/80 rounded-lg items-center justify-center"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <AntDesign name="heart" size={22} color={liked ? "red" : "gray"} />
    </TouchableOpacity>
  );
};

export default HeartButton;
