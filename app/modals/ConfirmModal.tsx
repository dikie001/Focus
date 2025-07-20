import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useModal } from "../context/ModalContext";

type ConfirmProps = {
  onConfirm: () => void;
};

const ConfirmModal = ({ onConfirm }:ConfirmProps) => {
  const { open, close, isOpen } = useModal();
  return (
    <Modal
      visible={isOpen("confirm-modal")}
      animationType="fade"
      transparent
      onRequestClose={() => close("confirm-modal")}
    >
      <Pressable
        onPress={() => close("confirm-modal")}
        className="flex-1 bg-black/50 justify-center"
      >
        <Pressable
          onPress={() => {}}
          className="bg-white dark:bg-zinc-900 p-4 rounded-2xl"
        >
          <Text className="text-black dark:text-white text-center">
            Are you sure you want to exit this session?
          </Text>

          <View className="flex-row justify-between space-x-3 mt-5">
            <TouchableOpacity
              onPress={() => {
                close("confirm-modal");
                return;
              }}
              className="flex-1 bg-primary-sButton dark:bg-neutral-700 p-3 rounded-xl items-center"
            >
              <Text className="text-black dark:text-white">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-primary-pButton p-3 rounded-xl items-center"
            >
              <Text className="text-white font-semibold">Yes, exit</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ConfirmModal;
