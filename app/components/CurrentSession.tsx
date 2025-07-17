import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const CurrentSession = () => {
  return (
      <View className="shadow-md bg-gradient-to-r from-purple-500 to-blue-500 dark:from-slate-900 dark:to-orange-900 rounded-xl p-4 mt-14 mb-6">
        <Text className="text-white text-lg font-semibold mb-1">
          Current Session
        </Text>
        <Text className="text-white/80 text-sm mb-4">
          Deep Work • Design Review
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-end">
            <Text className="text-white text-4xl font-bold">25:00</Text>
            <Text className="text-white/70 ml-2 mb-1 text-sm">remaining</Text>
          </View>

          <TouchableOpacity className="bg-white/20 rounded-full p-3">
            <Ionicons name="pause" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default CurrentSession