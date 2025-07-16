import React from "react";
import { Text, View } from "react-native";

const TodaySchedule = () => {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Today's Schedule
      </Text>

      <View className="space-y-3">
        {/* Item 1 */}
        <View className="bg-white dark:bg-neutral-900 rounded-xl p-4 flex-row items-center">
          <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
          <View>
            <Text className="text-gray-900 dark:text-white font-medium">
              Design System
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              10:00 - 11:30 AM
            </Text>
          </View>
        </View>

        {/* Item 2 */}
        <View className="bg-white dark:bg-neutral-900 rounded-xl p-4 flex-row items-center">
          <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
          <View>
            <Text className="text-gray-900 dark:text-white font-medium">
              Code Review
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              2:00 - 3:00 PM
            </Text>
          </View>
        </View>

        {/* Item 3 */}
        <View className="bg-white dark:bg-neutral-900 rounded-xl p-4 flex-row items-center">
          <View className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
          <View>
            <Text className="text-gray-900 dark:text-white font-medium">
              Learn RN
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              4:00 - 5:00 PM
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TodaySchedule;
