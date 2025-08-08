import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useModal } from "../context/ModalContext";

type NotificationModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
};

interface NotifTypes{
  title:string,
  time:string
}
const NOTIFICATIONS = "focus-notifications";

const NotificationModal = () => {
  const { open, close, isOpen } = useModal();
  const [notifications, setNotifications] = useState<NotifTypes[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const allNotifs = await AsyncStorage.getItem(NOTIFICATIONS);
      const parsedNotifs = allNotifs ? JSON.parse(allNotifs) : [];
      const reverse = parsedNotifs.splice("").reverse();
      const filtered = reverse.filter((_:any, index: number) => index <= 4);
      setNotifications(filtered);
    };
    fetchNotifications();
  }, [isOpen("notification-modal")]);


  const clearNotifications = async () => {
    await AsyncStorage.removeItem(NOTIFICATIONS);
    setNotifications([]);
  };
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
          className="bg-white dark:bg-neutral-900 rounded-xl p-4 w-full max-w-md shadow-lg"
        >
          <Text className="text-xl font-bold text-black dark:text-white mb-2">
            <Ionicons
              name="notifications"
              size={16}
              className="text-orange-600 dark:text-gray-400 mr-3"
            />{" "}
            Notifications
          </Text>

          {/* Notifications mapped */}
          {notifications?.map((notif: any,index:number) => (
            <View className=" flex  my-1" key={index}>

              <Pressable
                key={index}
                className={` flex-1  bg-gray-200  justify-center px-4 py-2 rounded-xl shadow-lg dark:bg-gray-800 `}
              >
                <Text className={` text-zinc-700 font-medium dark:text-zinc-300 text-xs `}>
                  {notif?.title}
                </Text>
                <Text className=" text-zinc-500 text-[10px] dark:text-zinc-300 ">
                  {notif?.time}
                </Text>
              </Pressable>
            </View>
          ))}
          {notifications.length === 0 && (
            <View>
              <Ionicons
                name="notifications-off-outline"
                size={40}
                className="text-center mb-2 text-orange-600 dark:text-gray-400"
              />
              <Text className="text-orange-600 dark:text-gray-400 text-center">
                No notifications
              </Text>
            </View>
          )}
          <Pressable
            onPress={() => close("notification-modal")}
            className="bg-neutral-600 rounded-xl py-2 px-4 self-center mt-5"
          >
            <Text className="text-white text-center font-semibold">Close</Text>
          </Pressable>
          {/* Clear all notifications */}
          <Pressable
            onPress={() => {
              clearNotifications();
              setTimeout(() => {
                close("notification-modal");
              }, 500);
            }}
            className="absolute top-4 right-4"
          >
            <Text className="text-red-600 font-medium text-xs">clear all</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default NotificationModal;
