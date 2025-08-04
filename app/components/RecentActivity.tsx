import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getCompletedTasks } from "../utils/MiniFunctions";

const COMPLETED_TASKS = "focus-completed-tasks";

interface TaskTypes{
  title:string,
  description:string,
  category:string,
  duration:string,
  endTime:string

}

const RecentActivity = () => {
  const [tasks, setTasks] = useState<any>();
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    getRecentAsctivity();
  }, []);
  const getRecentAsctivity = async () => {
    const loadedData = await getCompletedTasks()
    const parsedData = loadedData? JSON.parse(loadedData):[]
    
    // const reversedData = parsedData.slice().reverse();
    // console.log(reversedData);
    const filteredData = parsedData.filter(
      (_: any, index: number) => index <= 3
    );
    setTasks(filteredData);
    console.log(filteredData)
  };
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Recent Activity
      </Text>

      <View className="space-y-3">
        {tasks?.slice().reverse().map((task: any) => (
          <View
            key={task?.id}
            className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md px-4 py-2"
          >
            <Text className="text-gray-800 font-semibold dark:text-gray-200">
              {task?.title}
            </Text>
            <Text className="text-xs text-gray-700 dark:text-gray-400">
              {task?.description}
            </Text>

            <Ionicons
            className={`absolute top-2 right-3 ${task?.category === 'work'? "text-blue-600":"text-green-400"}`}
            size={18}
              name={
                task?.category === "work" ? "briefcase-outline" : "book-outline"
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default RecentActivity;
