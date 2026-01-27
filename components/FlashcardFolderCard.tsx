import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FlashcardFolderProps {
  folderId: string;
  text: string;
  image?: any;
  onFolderEdit: (id: string) => void;
  onFolderDelete: (id: string) => void;
}

const FlashcardFolderCard: React.FC<FlashcardFolderProps> = ({
  folderId,
  text,
  image,
  onFolderEdit,
  onFolderDelete,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const containerProps: any = {
    className: "flex-1 bg-[#FFF9E5] rounded-2xl items-center justify-center overflow-hidden",
  };
  if (image) {
    containerProps.source = image;
    containerProps.resizeMode = "cover";
  }

  return React.createElement(
    image ? ImageBackground : View,
    containerProps,
    <>
      {/* IMAGE OVERLAY */}
      {image && (
        <View className="absolute inset-0 bg-white/30" />
      )}

      {/* TOP GREEN BAR */}
      <View className="absolute top-0 left-0 right-0 h-[20%] bg-[#39675F] z-10" />

      {/* 3 DOTS + POPUP */}
      <View className="absolute top-2 right-2 flex-row z-20">
        {[0, 1, 2].map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setPopupVisible((v) => !v)}
            className="w-2 h-2 rounded-full bg-white mx-[2px]"
          />
        ))}

        {popupVisible && (
          <View className="absolute top-4 right-0 bg-white rounded-lg p-2 shadow-lg">
            <TouchableOpacity
              className="py-1"
              onPress={() => {
                onFolderEdit(folderId);
                setPopupVisible(false);
              }}
            >
              <Text className="text-blue-500 font-semibold">
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-1"
              onPress={() => {
                onFolderDelete(folderId);
                setPopupVisible(false);
              }}
            >
              <Text className="text-red-500 font-semibold">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* TITLE */}
      <Text className="text-lg font-bold text-[#553A00] text-center z-10 px-2">
        {text}
      </Text>
    </>
  );
};

export default FlashcardFolderCard;
