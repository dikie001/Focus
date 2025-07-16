import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const RecentActivity = () => {
  return (
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Recent Activity
        </Text>

        <View className="space-y-3">
          {/* Task Completed */}
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full items-center justify-center flex mr-3">
              <Ionicons name="checkmark" size={16} color="#16a34a" />
            </View>
            <View>
              <Text className="text-gray-900 dark:text-white">
                Completed: Review Design
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                2h ago
              </Text>
            </View>
          </View>

          {/* Session End */}
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full items-center justify-center flex mr-3">
              <Ionicons name="timer-outline" size={16} color="#3b82f6" />
            </View>
            <View>
              <Text className="text-gray-900 dark:text-white">
                Focus session done
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                4h ago
              </Text>
            </View>
          </View>
        </View>
      </View>  )
}

export default RecentActivity