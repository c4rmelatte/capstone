import PromoCard from "@/components/PromoCard";
import SearchBar from "@/components/SearchBox";
import WaterTile from "@/components/WaterTile";
import WaterTypeSelector from "@/components/WaterTypeSelector";
import { useWater } from "@/context/WaterContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const { waterItems, loading } = useWater();

  if (loading) return <Text>Loading...</Text>;

  const [selectedType, setSelectedType] = useState("All");

  const handleItemPress = (item: any) => {
    console.log("Pressed item:", item.imageKey);
    router.push({
      pathname: "/(tabs)/home/product",
      params: {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.imageKey,
        rating: item.rating,
        ratingCount: item.ratingCount,
        isAvailable: item.isAvailable,
      },
    });
  };

  const filteredData =
    selectedType === "All" ? waterItems : waterItems.filter((item) => item.type === selectedType);
  return (
    <View className="flex-1 ">
      <StatusBar barStyle="light-content" />
      {/* Header Section */}
      <View className="bg-[#3FBDF1] h-[235] rounded-b-xl px-5 pt-2">
        <Text className="text-white text-lg font-semibold mt-24">Welcome Back!</Text>
        <Text className="text-white text-2xl font-bold mt-1 ">Mr Product</Text>

        {/* Search Box */}
        <View className="mt-6">
          <SearchBar />
        </View>
      </View>
      {/* White background below header */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleItemPress(item)}
            activeOpacity={0.8}
            style={{
              flex: 1,
              margin: 5, // spacing between tiles
            }}
          >
            <WaterTile name={item.name} price={item.price} image={item.imageKey} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingRight: 15, paddingLeft: 10 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <PromoCard />

            <Text className="px-4 pt-5 font-bold" style={{ fontFamily: "RubicVarient" }}>
              Water Type
            </Text>
            <WaterTypeSelector selected={selectedType} onSelect={(type) => setSelectedType(type)} />
          </View>
        }
      />
    </View>
  );
};

export default Home;
