import CustomButton from "@/components/CustomButton";
import Pagination from "@/components/Pagination";
import { slides } from "@/utils/onboarding.util";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const Onboarding = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(slideIndex);
  };

  const renderSlide = ({ item }: { item: (typeof slides)[0] }) => {
    return (
      <View style={{ width: SCREEN_WIDTH }} className="items-center justify-center p-6">
        <Image source={item.image} className="w-80 h-80 mb-6" resizeMode="contain" />
        <Text className="text-2xl font-bold text-center mb-4">{item.title}</Text>
        <Text className="text-center text-pure-gray">{item.description}</Text>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/welcome");
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* //Skip Button top right */}
      <TouchableOpacity className="absolute top-20 right-5 z-10">
        <Text className="text-pure-blue font-semibold">Skip</Text>
      </TouchableOpacity>
      {/* //Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={renderSlide}
      />

      {/* Pagination */}
      <Pagination
        length={slides.length}
        currentIndex={currentIndex}
        activeColor="bg-pure-blue"
        inactiveColor="bg-pure-gray/40"
        activeWidth={16}
        inactiveWidth={16}
        height={4}
        spacing={8}
      />

      {/* Custom Button */}

      <View className="flex-row justify-end px-11 mb-16 mt-2">
        <CustomButton
          title={currentIndex === slides.length - 1 ? "Get started" : "Next"}
          onPress={handleNext}
          width={318}
          height={60}
          borderRadius={10}
          backgroundColor="bg-pure-blue"
          textColor="text-white"
        />
      </View>
    </View>
  );
};

export default Onboarding;
