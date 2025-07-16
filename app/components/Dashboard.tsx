import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Dashboard = () => {
  return (
    <View className="flex-row flex-wrap justify-between mb-6">
      {/* Focus Time */}
      <View className="w-[48%] bg-white dark:bg-neutral-900 rounded-xl p-4 mb-4">
        <Ionicons
          name="timer-outline"
          size={20}
          color="#6366f1"
          className="mb-1"
        />
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          Focus Time
        </Text>
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          2h 45m
        </Text>
      </View>

      {/* Tasks Done */}
      <View className="w-[48%] bg-white dark:bg-neutral-900 rounded-xl p-4 mb-4">
        <Ionicons
          name="checkmark-circle-outline"
          size={20}
          color="#22c55e"
          className="mb-1"
        />
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          Tasks Done
        </Text>
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          8 / 10
        </Text>
      </View>

      {/* Productivity */}
      <View className="w-[48%] bg-white dark:bg-neutral-900 rounded-xl p-4 mb-4">
        <Ionicons
          name="trending-up-outline"
          size={20}
          color="#f97316"
          className="mb-1"
        />
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          Productivity
        </Text>
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          87%
        </Text>
      </View>

      {/* Energy */}
      <View className="w-[48%] bg-white dark:bg-neutral-900 rounded-xl p-4 mb-4">
        <Ionicons
          name="flash-outline"
          size={20}
          color="#eab308"
          className="mb-1"
        />
        <Text className="text-sm text-gray-500 dark:text-gray-400">Energy</Text>
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          High
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;
