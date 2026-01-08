import CartButton from "@/components/CartButton";
import CustomButton from "@/components/CustomButton";
import HeartButton from "@/components/HeartButton";
import QuantitySelector from "@/components/QuantitySelecter";
import SizeDropdown from "@/components/SizeDropdwn";
import Images from "@/constants/images";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import { Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Product = () => {
  const router = useRouter();
  const { name, price, description, image, rating, ratingCount, isAvailable } =
    useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<string>("");
  console.log("Image param:", image);
  // Normalize the incoming `image` param to an ImageSourcePropType:
  // - if it's a string use { uri: string }
  // - if it's a string[] use the first element as uri
  // - otherwise pass through (may already be an object)
  const imageSource: ImageSourcePropType = image ? Images[image as keyof typeof Images] : null; // fallback

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  //   const imageSource = typeof image === "string" ? { uri: image } : image;
  return (
    <View className="flex-1 bg-white justify-center ">
      {/* Top Image Section */}
      <View className="relative h-1/3">
        <Image source={imageSource} className="w-full h-full" resizeMode="cover" />
        {/* Overlay Gradient (optional aesthetic) */}
        <View className="absolute top-0 left-0 right-0 h-24 bg-black/20" />

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-24 left-5 w-10 h-10 bg-white/80 rounded-full items-center justify-center"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <ArrowLeft color="#000" size={22} />
        </TouchableOpacity>

        {/* Heart Icon */}
        <View className=" bottom-56">
          <HeartButton />
        </View>
        <View className=" bottom-16">
          <CartButton />
        </View>
      </View>

      {/* Content Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-5 pt-5"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Name & Price */}
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-col justify-between ">
            <Text className="text-2xl font-bold text-gray-900">{name}</Text>
            <Text className="text-xl font-semibold text-gray-900">${price}</Text>
          </View>
          <View>
            <Text className="text-sm font-medium text-gray-600">
              {isAvailable ? "(Available In Stock)" : "(No Available In Stock)"}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text className="text-gray-600 mt-3 leading-6">{description}</Text>

        {/* Rating */}
        <View className="flex-row items-center mt-4">
          <Text className="text-gray text-base">⭐ {rating}</Text>
          <Text className="text-gray-500 text-sm ml-2">({ratingCount} reviews)</Text>
        </View>
        <View className="flex-row justify-between">
          <View>
            <Text className="pt-10 pb-2">Bottle size</Text>
            <SizeDropdown selectedSize={selectedSize} onSelect={setSelectedSize} />
          </View>
          <View className="ml-4 mt-12">
            <Text className="pb-2">Quantity</Text>
            <QuantitySelector
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-5 left-0 right-0 px-12">
        <CustomButton title={"Buy"} onPress={() => {}} />
      </View>
    </View>
  );
};

export default Product;
