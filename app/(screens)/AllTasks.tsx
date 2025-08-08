import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import {
  createNewSession,
  fetchCurrentSessionTask,
  getAllTasks,
} from "../utils/MiniFunctions";
import { router } from "expo-router";

type TaskType = {
  title: string;
  description: string;
  duration: string;
  endTime: string;
  id: string;
  startTime: string;
};

type MainProps = {
  onStart: () => void;
};

const AllTasks = ({ onStart }: MainProps) => {
  // const { isOpen, close, open } = useModal();
  const [tasks, setTasks] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from storage
  const fetchData = async () => {
    const rawData = await getAllTasks();
    const parsedData = rawData ? JSON.parse(rawData) : [];
    const filtered = parsedData.filter((_: any, index: number) => index < 9);
    setTasks(filtered);
  };

  //handle start task
  const handleStartTask = async (id: string) => {
    const sessionStatus = await fetchCurrentSessionTask();
    if (sessionStatus) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Finish the current task first before moving to the next.",
      });
      return;
    }
    const currentTask = tasks.find((task: TaskType) => task.id === id);
    createNewSession(currentTask);
    onStart();
  };

  return (
    <View>
      {/* <Navbar/> */}
      <ScrollView>
        <Pressable className="flex-1 justify-end bg-black/50 ">
          <Pressable
            onPress={() => {}}
            className="bg-white dark:bg-neutral-900 p-4  h-dvh space-y-4"
          >
            <Pressable className=" z-50">
              <Ionicons
                name="chevron-back"
                size={22}
                onPress={()=>router.back()}
                className="text-blue-900 dark:text-white absolute top-2 left-2 active:bg-neutral-800 p-2 rounded-full" 
              />
            </Pressable>
            <Text className="text-black text-center font-semibold dark:text-white text-xl">
              All tasks
            </Text>

            {/* No task added? */}
            {!tasks ||
              (tasks.length === 0 && (
                <View className="flex flex-col justify-center items-center">
                  <Text className="text-gray-600 leading-4 text-center dark:text-gray-400">
                    No tasks added yet, click the button below to get started
                  </Text>
                  <TouchableOpacity
                    onPress={() => {}}
                    className="px-4 py-2 mt-2 rounded-xl shadow-xl bg-primary-pButton "
                  >
                    <Text className="text-white font-medium">Add Task</Text>
                  </TouchableOpacity>
                </View>
              ))}
            {/* mapp tasks */}
            <View className="flex  flex-col space-y-2">
              {tasks
                ?.slice()
                .reverse()
                .map((task: TaskType) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleStartTask(task.id);
                      onStart;
                    }}
                    key={task.id}
                    className="flex flex-row justify-between bg-gradient-to-tr  from-blue-800 to-purple-700 dark:shadow-black/50 dark:bg-gradient-to-tl  dark:from-orange-950 dark:to-gray-900 shadow-lg rounded-xl py-2 px-4"
                  >
                    <View className="overflow-hidden max-w-56">
                      <Text
                        numberOfLines={2}
                        className="text-white font-semibold"
                      >
                        {task.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className="flex-1 text-gray-200 text-xs"
                      >
                        {task.description}
                      </Text>
                    </View>
                    <View className="items-center justify-center">
                      <TouchableOpacity
                        onPress={() => {}}
                        className=" h-7 w-7 bg-white/20 flex  items-center justify-center rounded-full "
                      >
                        <Ionicons
                          name="play"
                          className="text-white "
                          size={15}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </Pressable>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AllTasks;
