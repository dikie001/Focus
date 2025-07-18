import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useModal } from "../context/ModalContext";
import { fetchCurrentSessionTask } from "../utils/MIniFunctions";

const CurrentSession = () => {
  const { open, close, isOpen } = useModal();
  const [task, setTask] = useState<any>([]);
  const [pause, setPause] = useState<boolean>(false);
  const countRef = useRef<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);

  //run the fetch
  useEffect(() => {
    if (!isOpen("start-task")) {
      fetchCurrentTask();
    }
  }, [isOpen("start-task")]);

  //the fetch to be run everytime start-task modal closes
  const fetchCurrentTask = async () => {
    const rawData = await fetchCurrentSessionTask();
    const parsedData = rawData ? JSON.parse(rawData) : [];
    setTask(parsedData);
    countRef.current = Number(parsedData.duration * 60);
  };

  //timer interval
  useEffect(() => {
    // if (countRef.current <= 0) console.log('done...');
    // if(timeLeft <=0) console.log('done')
    if (countRef.current <= 0) {
      console.log("hello");
    }
    if(timeLeft<=0){
      console.log("time")
    }
    
    intervalRef.current = setInterval(() => {
      countRef.current -= 1;
      console.log(countRef.current);
      setTimeLeft(countRef.current);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  //format time
  const formatTime = (s: number) => {
    const min = Math.floor((s % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    const hours = Math.floor(s / 3600)
      .toString()
      .padStart(2, "0");
    return `${hours}:${min}:${sec}`;
  };

  //handle play or pause
  const handlePlayPause = () => {
    setPause(!pause);
  };
  return (
    <View className="shadow-md bg-gradient-to-br from-purple-500 to-blue-500 dark:from-slate-950 dark:to-orange-950 rounded-xl p-4 mt-14 mb-6">
      <Text className="text-white dark:text-white text-lg font-semibold mb-1">
        Current Session
      </Text>

      <Text className="text-white/90  font-medium mb-4">
        {task?.title || "no task"}
      </Text>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-end">
          <Text className="text-white text-3xl font-bold">
            {formatTime(timeLeft)}
          </Text>
          <Text className="text-white/70 ml-1 mb-1 text-xs">remaining</Text>
        </View>

        <TouchableOpacity
          onPress={handlePlayPause}
          className="bg-white/20 rounded-full p-3"
        >
          <Ionicons name={pause ? "play" : "pause"} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CurrentSession;

// NOISE MAKERS
// 1. Blessing Nora
// 2. Gavin Sowon
// 3. Ryanne Ochieng
// 4. Matilda Awino
// 5. Ann Judy
// 6. Abungu
