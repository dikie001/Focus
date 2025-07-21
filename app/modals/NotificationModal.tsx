import React from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModal } from "../context/ModalContext";

type Notification = {
  id: string;
  title: string;
  message: string;
  time?: string;
};

type NotificationModalProps = {
  notifications: Notification[];
  onDismissOne?: (id: string) => void;
  onDismissAll?: () => void;
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onDismissOne,
  onDismissAll,
}) => {
  const { isOpen, close } = useModal();

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isOpen("notification-modal")}
      onRequestClose={() => close("notification-modal")}
    >
      <Pressable
        onPress={() => close("notification-modal")}
        className="flex-1 bg-black/50 justify-center items-center px-4"
      >
        <Pressable
          onPress={() => {}}
          className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl max-h-[80%]"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="notifications" size={22} color="#2563eb" />
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Notifications
              </Text>
            </View>
            {onDismissAll && notifications.length > 0 && (
              <Pressable onPress={onDismissAll}>
                <Text className="text-sm text-blue-500 font-medium">
                  Clear All
                </Text>
              </Pressable>
            )}
          </View>

          {notifications?.length === 0 ? (
            <Text className="text-gray-500 dark:text-gray-400 text-center">
              No new notifications
            </Text>
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 12 }}
              renderItem={({ item }) => (
                <View className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1 pr-2">
                      <Text className="text-base font-semibold text-gray-800 dark:text-white">
                        {item.title}
                      </Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {item.message}
                      </Text>
                      {item.time && (
                        <Text className="text-xs text-gray-400 mt-1">
                          {item.time}
                        </Text>
                      )}
                    </View>
                    {onDismissOne && (
                      <Pressable onPress={() => onDismissOne(item.id)}>
                        <Ionicons name="close" size={18} color="#ef4444" />
                      </Pressable>
                    )}
                  </View>
                </View>
              )}
            />
          )}

          {/* Close Button */}
          <Pressable
            onPress={() => close("notification-modal")}
            className="mt-4 bg-blue-600 rounded-full py-2 px-4 self-end"
          >
            <Text className="text-white font-semibold text-sm text-center">
              Close
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default NotificationModal;
