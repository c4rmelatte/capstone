import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface DeleteAccPopOutProps {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteAccPopOut: React.FC<DeleteAccPopOutProps> = ({
  visible,
  onDelete,
  onCancel,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      {/* Overlay */}
      <View className="flex-1 bg-black/40 items-center justify-center">
        {/* Card */}
        <View className="w-[90%] rounded-3xl bg-[#D6B27C] px-6 py-7">
          {/* Title */}
          <Text className="text-2xl font-bold text-center text-[#3B2A0A] mb-3">
            Delete Account
          </Text>

          {/* Description */}
          <Text className="text-center text-[#3B2A0A] mb-5">
            Are you sure you want to delete{"\n"}your account?
          </Text>

          {/* Warning Box */}
          <View className="flex-row items-start bg-[#FFF1A8] rounded-xl p-4 mb-6">
            <Feather name="alert-triangle" size={20} color="#6B4E00" />
            <View className="ml-3 flex-1">
              <Text className="font-bold text-[#6B4E00] mb-1">
                Warning!
              </Text>
              <Text className="text-[#6B4E00] text-sm">
                Once deleted, you will no longer be able to sign in or use this
                account.
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row justify-between">
            {/* Delete */}
            <TouchableOpacity
              onPress={onDelete}
              className="flex-1 mr-2 bg-[#E85C4A] py-3 rounded-full border-2 border-black"
            >
              <Text className="text-center font-bold text-black">
                Delete
              </Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 ml-2 bg-[#FFF5E1] py-3 rounded-full border-2 border-black"
            >
              <Text className="text-center font-bold text-black">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccPopOut;
