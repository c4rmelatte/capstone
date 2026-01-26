import React, { useState } from "react";
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface FlashcardFolderProps {
  folderId: string;
  text: string;
  image?: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = (size: number) => (SCREEN_WIDTH / 375) * size;

const FlashcardFolder: React.FC<FlashcardFolderProps> = ({
  folderId,
  text,
  image,
  onEdit,
  onDelete,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const Container = (image ? ImageBackground : View) as React.ComponentType<any>;

  return (
    <Container source={image || undefined} resizeMode="cover" style={styles.container}>
      {image && <View style={styles.overlay} />}

      {/* TOP GREEN BAR */}
      <View style={styles.topBar} />

      {/* 3 DOTS */}
      <View style={styles.topRightButtons}>
        {[0, 1, 2].map((i) => (
          <TouchableOpacity
            key={i}
            style={styles.circle}
            onPress={() => setPopupVisible((v) => !v)}
          />
        ))}

        {popupVisible && (
          <View style={styles.popup}>
            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => {
                onEdit(folderId);
                setPopupVisible(false);
              }}
            >
              <Text style={styles.editText}>✏️ Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => {
                onDelete(folderId);
                setPopupVisible(false);
              }}
            >
              <Text style={styles.deleteText}>🗑 Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* TITLE */}
      <Text style={styles.text}>{text}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E5",
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "20%",
    backgroundColor: "#39675F",
    zIndex: 5,
  },
  topRightButtons: {
    position: "absolute",
    top: scale(8),
    right: scale(8),
    flexDirection: "row",
    zIndex: 20,
  },
  circle: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: "#FFF",
    marginHorizontal: scale(2),
  },
  popup: {
    position: "absolute",
    top: scale(14),
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: scale(8),
    padding: scale(8),
    elevation: 6,
  },
  popupItem: {
    paddingVertical: scale(4),
  },
  editText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  deleteText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
  text: {
    fontSize: scale(18),
    fontWeight: "700",
    color: "#553A00",
    textAlign: "center",
    zIndex: 10,
  },
});

export default FlashcardFolder;
