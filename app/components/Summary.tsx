import { View, Text } from 'react-native'
import React from 'react'

const Summary = () => {
  return (
      <View className="flex-row space-x-4 mb-6">
        <View className="flex-1 bg-blue-100 dark:bg-blue-900/20 rounded-xl p-4">
          <Text className="text-blue-600 dark:text-blue-400 text-sm font-medium">
            Current Streak
          </Text>
          <Text className="text-2xl font-bold text-blue-800 dark:text-blue-300">
            7 days 🔥
          </Text>
        </View>
        <View className="flex-1 bg-green-100 dark:bg-green-900/20 rounded-xl p-4">
          <Text className="text-green-600 dark:text-green-400 text-sm font-medium">
            Today's Focus
          </Text>
          <Text className="text-2xl font-bold text-green-800 dark:text-green-300">
            2h 30m
          </Text>
        </View>
      </View> 
  )
  };


export default Summary