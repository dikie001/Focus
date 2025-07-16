import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const QuickActions = () => {
  return (
      <View className="flex-row space-x-4 mb-6">
        <TouchableOpacity className="flex-1 bg-blue-600 dark:bg-blue-700 rounded-xl p-4 flex-row justify-center items-center">
          <Ionicons name="play" size={20} color="#fff" className="mr-2" />
          <Text className="text-white font-semibold">Start Session</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-xl p-4 flex-row justify-center items-center">
          <Ionicons name="add" size={20} color="#4b5563" className="mr-2" />
          <Text className="text-gray-700 dark:text-gray-300 font-semibold">
            Add Task
          </Text>
        </TouchableOpacity>
      </View>
  )
}

export default QuickActions