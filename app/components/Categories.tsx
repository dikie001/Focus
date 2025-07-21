import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const ALL_TASKS = "focus-all-tasks";

type TaskTypes = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
  category: string;
};

const Categories = () => {
  const [workTasks, setWorkTasks] = useState<number>(0);
  const [learningTasks, setLearningTasks] = useState<number>(0);
  const [learningTime, setLearningTime] = useState<string>("");
  const [workTime, setWorkTime] = useState<string>("");

  useEffect(() => {
    getDuration();
  }, []);
  const getDuration = async () => {
    const rawData = await AsyncStorage.getItem(ALL_TASKS);
    const parsedData = rawData ? JSON.parse(rawData) : [];

    //WORKING
    const work_tasks = parsedData.filter(
      (item: TaskTypes) => item.category === "work"
    );
    const workDuration = work_tasks.map((item: TaskTypes) => item.duration);
    const workSum = workDuration.reduce(
      (total: number, duration: number) => total + Number(duration),
      0
    ); 
    console.log("worksum", workSum);
    setWorkTasks(workSum * 60);

    // LEARNING
    const learning_tasks = parsedData.filter(
      (item: TaskTypes) => item.category === "learning"
    );
    const learnDuration = learning_tasks.map(
      (item: TaskTypes) => item.duration  
    );
    const learnSum = learnDuration.reduce(
      (total: number, duration: number) => total + Number(duration),
      0
    );

    setLearningTasks(learnSum * 60);
    calculateDuration();
  };

  const calculateDuration = () => {
    const min = Math.floor((workTasks % 3600) / 60) 
      .toString()
      .padStart(1, "0");

    const hours = Math.floor(workTasks / 3600)
      .toString()
      .padStart(1, "0"); 
    setWorkTime(`${hours}h ${min}m`);

    const min2 = Math.floor((learningTasks % 3600) / 60)
      .toString() 
      .padStart(1, "0");  

    const hours2 = Math.floor(learningTasks / 3600)
      .toString()
      .padStart(1, "0");
    setLearningTime(`${hours2}h ${min2}m`);
  };
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
            {workTime}
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
            {learningTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Categories;
