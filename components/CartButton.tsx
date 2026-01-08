import { ShoppingCart } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const CartButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setLiked(!liked)}
      className="absolute top-5 right-5 w-9 h-9 bg-white rounded-lg items-center justify-center"
      style={{
        shadowColor: "#000",

        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <ShoppingCart size={26} color={"#3FBDF1"} />
    </TouchableOpacity>
  );
};

export default CartButton;
