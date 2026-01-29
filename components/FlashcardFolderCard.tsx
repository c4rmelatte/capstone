import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EditDeletePopUp from "./EditDeletePopUp";

interface FlashcardFolderProps {
  folderId: string;
  text: string;
  image?: any;
  onFolderEdit: (id: string) => void;
  onFolderDelete: (id: string) => void;
  onFolderPress: (id: string) => void; 
}

const FlashcardFolderCard: React.FC<FlashcardFolderProps> = ({
  folderId,
  text,
  image,
  onFolderEdit,
  onFolderDelete,
  onFolderPress,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const containerProps: any = {
    className:
      "flex-1 bg-[#FFF9E5] rounded-2xl items-center justify-center overflow-hidden p-3",
  };

  if (image) {
    containerProps.source = image;
    containerProps.resizeMode = "cover";
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onFolderPress(folderId)}
      disabled={popupVisible}
      className="flex-1"
    >
      {React.createElement(
        image ? ImageBackground : View,
        containerProps,
        <>
          {/* IMAGE OVERLAY */}
          {image && <View className="absolute inset-0 bg-white/30" />}

          {/* TOP GREEN BAR */}
          <View className="absolute top-0 left-0 right-0 h-[20%] bg-[#39675F] z-10 flex-row justify-end items-center px-2">
            {[0, 1, 2].map((i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setPopupVisible((v) => !v)}
                className="w-2 h-2 rounded-full bg-white mx-[2px]"
              />
            ))}
          </View>

          {/* POPUP */}
          {popupVisible && (
            <View className="absolute top-2 right-2 z-20">
              <EditDeletePopUp
                onEdit={() => {
                  onFolderEdit(folderId);
                  setPopupVisible(false);
                }}
                onDelete={() => {
                  onFolderDelete(folderId);
                  setPopupVisible(false);
                }}
              />
            </View>
          )}

          {/* TITLE */}
          <Text className="text-lg font-bold text-[#553A00] text-center px-2">
            {text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default FlashcardFolderCard;
