import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useModal } from "../context/ModalContext";
import { Ionicons } from "@expo/vector-icons";

type MenuModalProps = {
  visible: boolean;
  onClose: () => void;
  items: { label: string; onPress: () => void }[];
};

const MenuModal: React.FC<MenuModalProps> = ({ items }) => {
  const { open, close, isOpen } = useModal();
  return (
    <Modal
      visible={isOpen("menu-modal")}
      animationType="slide"
      transparent
      onRequestClose={() => close("menu-modal")}
    >
      <Pressable
        onPress={() => close("menu-modal")}
        className="flex-1 bg-black/50 justify-end"
      >
        <Pressable onPress={()=>{}} className="bg-white dark:bg-zinc-900 p-4 rounded-t-2xl">
          <Text className="text-white font-semibold text-2xl text-center">
            Focus
          </Text>
          <TouchableOpacity
            onPress={() => open("add-task")}
            className="flex-1 shadow-md bg-gray-200 dark:bg-gray-700 rounded-xl p-4 flex-row justify-center items-center"
          >
            <Ionicons name="add" size={20} color="gray" className="mr-2" />
            <Text className="text-gray-700 dark:text-gray-300 font-semibold">
              Add Task
            </Text>
          </TouchableOpacity>

          <Pressable onPress={() => close("menu-modal")} className="mt-3 py-3">
            <Text className="text-center text-red-500 font-semibold">
              Cancel
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MenuModal;
