import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Categories = () => {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Categories
      </Text>

      <View className="flex-row justify-between">
        {/* Work */}
        <View className="flex-1 shadow-lg bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mr-2">
          <Ionicons
            name="briefcase-outline"
            size={22}
            color="#3b82f6"
            className="mb-1"
          />
          <Text className="text-blue-600 dark:text-blue-400 text-sm">Work</Text>
          <Text className="text-blue-900 dark:text-white font-bold">
            3h 15m
          </Text>
        </View>

        {/* Learning */}
        <View className="flex-1 shadow-lg bg-green-50 dark:bg-green-900/20 rounded-lg p-4 ml-2">
          <Ionicons
            name="book-outline"
            size={22}
            color="#22c55e"
            className="mb-1"
          />
          <Text className="text-green-600 dark:text-green-400 text-sm">
            Learning
          </Text>
          <Text className="text-green-900 dark:text-white font-bold">
            1h 30m
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Categories