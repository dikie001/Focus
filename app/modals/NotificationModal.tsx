import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useModal } from "../context/ModalContext";

type NotificationModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message: string;
};

const NotificationModal: React.FC<NotificationModalProps> = () => {
  const {open, close,isOpen}=useModal()
  return (
    <Modal
      transparent
      animationType="fade"
      visible={isOpen("notification-modal")}
      onRequestClose={()=>close("notification-modal")}
    >
      <Pressable onPress={()=>close("notification-modal")} className="flex-1 bg-black/50 justify-center items-center px-4">
        <Pressable onPress={()=>{}} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md shadow-lg">
          <Text className="text-xl font-bold text-black dark:text-white mb-2">
            Notifications
          </Text>
          <Text className="text-base text-zinc-700 dark:text-zinc-300 mb-4">
           Hello there my bro!
          </Text>
          <Pressable
            onPress={()=>close("notification-modal")}
            className="bg-blue-600 rounded-xl py-2 px-4 self-end"
          >
            <Text className="text-white text-center font-semibold">Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default NotificationModal;
