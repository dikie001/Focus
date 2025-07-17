import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Quotes = () => {
  return (
    <View className="shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-xl p-6 mb-10">
      <Ionicons name="book" size={24} color="white" className="mb-2" />
      <Text className="text-white text-lg italic font-medium mb-2">
        "Focus is about saying no."
      </Text>
      <Text className="text-white/80 text-sm">— Dickens Omondi</Text>
    </View>
  );
};

export default Quotes;
