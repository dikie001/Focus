import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useModal } from "../context/AddTaskContext";

const QuickActions = () => {
  const { open } = useModal();
  return (
    <View className="flex-row space-x-4 mb-6">
      <TouchableOpacity className="flex-1 shadow-md bg-blue-600 dark:bg-blue-700 rounded-xl p-4 flex-row justify-center items-center">
        <Ionicons name="play" size={20} color="#fff" className="mr-2" />
        <Text className="text-white font-semibold">Start Session</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={open} className="flex-1 shadow-md bg-gray-200 dark:bg-gray-700 rounded-xl p-4 flex-row justify-center items-center">
        <Ionicons name="add" size={20} color="gray" className="mr-2" />
        <Text className="text-gray-700 dark:text-gray-300 font-semibold">
          Add Task
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuickActions;
