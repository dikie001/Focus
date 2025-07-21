import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useModal } from "../context/ModalContext";
import { Ionicons } from "@expo/vector-icons";

const MenuModal = () => {
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
        <Pressable
          onPress={() => {}}
          className="bg-white dark:bg-neutral-900 p-6 rounded-t-2xl space-y-4"
        >
          {/* Title */}
          <View className="items-center mb-2">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Focus
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">
              Stay sharp, stay in control
            </Text>
          </View>

          {/* Add Task */}
          <TouchableOpacity
            onPress={() => {
              close("menu-modal");
              open("add-task");
            }}
            className="flex-row items-center space-x-2 bg-gray-100 shadow-md dark:bg-gray-800 rounded-lg p-3"
          >
            <Ionicons name="add-circle-outline" size={20} color="#22c55e" />
            <Text className="text-gray-800 dark:text-gray-200 font-medium">
              Add New Task
            </Text>
          </TouchableOpacity>

          {/* View All Tasks */}
          <TouchableOpacity
            onPress={() => {
              close("menu-modal");
              open("all-tasks");
            }}
            className="flex-row items-center space-x-2 bg-gray-100 shadow-md dark:bg-gray-800 rounded-lg p-3"
          >
            <Ionicons name="list-outline" size={20} color="#3b82f6" />
            <Text className="text-gray-800 dark:text-gray-200 font-medium">
              View All Tasks
            </Text>
          </TouchableOpacity>

          {/* Start Focus Session */}
          <TouchableOpacity
            onPress={() => {
              close("menu-modal");
              open("start-session");
            }}
            className="flex-row items-center space-x-2 bg-gray-100 shadow-md dark:bg-gray-800 rounded-lg p-3"
          >
            <Ionicons name="play-circle-outline" size={20} color="#f59e0b" />
            <Text className="text-gray-800 dark:text-gray-200 font-medium">
              Start Focus Session
            </Text>
          </TouchableOpacity>

          {/* Stats */}
          <TouchableOpacity
            onPress={() => {
              close("menu-modal");
              open("stats");
            }}
            className="flex-row items-center space-x-2 bg-gray-100 shadow-md dark:bg-gray-800 rounded-lg p-3"
          >
            <Ionicons name="bar-chart-outline" size={20} color="#8b5cf6" />
            <Text className="text-gray-800  dark:text-gray-200 font-medium">
              View Statistics
            </Text>
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity
            onPress={() => {
              close("menu-modal");
              open("settings");
            }}
            className="flex-row items-center space-x-2 bg-gray-100 shadow-md dark:bg-gray-800 rounded-lg p-3"
          >
            <Ionicons name="settings-outline" size={20} color="#0ea5e9" />
            <Text className="text-gray-800 dark:text-gray-200 font-medium">
              App Settings
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => close("menu-modal")}
            className="py-3"
          >
            <Text className="text-center text-red-500 font-semibold">
              Cancel
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MenuModal;
