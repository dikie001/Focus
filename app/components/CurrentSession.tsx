import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useModal } from "../context/ModalContext";
import ConfirmModal from "../modals/ConfirmModal";
import NotificationModal from "../modals/NotificationModal";
import StartTaskModal from "../modals/StartTaskModal";
import {
  Delete,
  fetchCurrentSessionTask,
  getPause,
  getPausedAt,
  purgeCurrentSession,
  purgePausedAt,
  savePausedAt,
  savePauseStatus,
  updateCompletedTasks,
  updateNotifications,
} from "../utils/MiniFunctions";

type TaskTypes = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
};
const NOTIFICATIONS = "focus-notifications";
const CurrentSession = () => {
  const { open, close, isOpen } = useModal();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [start, setStart] = useState(false);
  const pauseStatusRef = useRef<string | null>(null);
  const countRef = useRef<number>(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const taskRef = useRef<TaskTypes | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const pausedAtRef = useRef<string | null>(null);
  const [message, setMessage] = useState<string>("No task in session!");
  const [task, setTask] = useState<TaskTypes>();
  const [_, forceUpdate] = useState(0);
  const notificationRef = useRef<any>(null);
  const notification = {
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    content: message,
    title: task?.title,
  };

  useEffect(() => {
    fetchCurrentTask();
    // getSavedTime();
    // // getPause();
  }, []);

  //get the saved time for pause from storage
  async function getSavedTime() {
    const pausedTime = await getPausedAt();
    if (!pausedTime || pausedTime === null) {
      return;
    }
    countRef.current = Number(pausedTime);
  }

  //Re-render the component
  const rerender = () => {
    forceUpdate((prev) => prev + 1);
  };

  //the fetch to be run everytime start-task modal closes
  const fetchCurrentTask = async () => {
    const currentSession = await fetchCurrentSessionTask();
    if (currentSession) {
      setMessage("New task in session...");
      const parsedData = JSON.parse(currentSession);
      taskRef.current = parsedData;
      setTask(parsedData);
      countRef.current = Number(parsedData.duration * 60);
      setTimeLeft(countRef.current);
      pauseStatusRef.current = "playing";
    } else {
      setMessage("No task in session...");

      return;
    }
  };

  //timer interval
  useEffect(() => {
    timer();
    updateNotifications(notification);
  }, []);

  //THE TIMER INTERVAL
  const timer = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (countRef.current <= 0) {
        return;
      }

      if (countRef.current === 1) {
        updateCompletedTasks(taskRef.current);
        if (taskRef.current !== null) {
          Delete(taskRef.current.id);
        }
        setMessage("Task completed!");
        updateNotifications(notification);
        taskRef.current = null;
      }

      countRef.current -= 1;
      setTimeLeft(countRef.current);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  };

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

  //create new notification for notification modal
  // const createNewNotification = async () => {
  //   const previousNotifs = await AsyncStorage.getItem(NOTIFICATIONS);
  //   const parsedNotifs = previousNotifs ? JSON.parse(previousNotifs) : [];
  //   const updatedNotifs = [...parsedNotifs, notification];
  //   await AsyncStorage.setItem(NOTIFICATIONS, JSON.stringify(updatedNotifs));
  // };

  //handle play or pause
  const handlePlayPause = async () => {
    setIsPlaying(!isPlaying);
    pauseStatusRef.current =
      pauseStatusRef.current === "playing"
        ? "paused"
        : pauseStatusRef.current === "paused"
          ? "playing"
          : "paused";
    await savePauseStatus(pauseStatusRef.current);

    //clear the interval AND SETTING IT TO NULL THUS PAUSING THE TIMER
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (intervalRef.current === null) {
    }

    await savePausedAt(countRef.current);

    //get the paused time if it exists and resume the interval
    const pausedTime = await getPausedAt();
    const pauseStatus = await getPause();
    if (pausedTime > 0 && pauseStatus === "playing") {
      countRef.current = pausedTime;
      intervalRef.current = setInterval(() => {
        if (countRef.current <= 0) {
          return;
        }

        if (countRef.current === 1) {
          updateCompletedTasks(taskRef.current);
          purgeCurrentSession();
          setMessage("Task completed!");
          updateNotifications(notification);
        }

        countRef.current -= 1;
        setTimeLeft(countRef.current);
      }, 1000);
    } else if (pausedTime === null || !pausedTime) {
    }
  };

  //lauch exit session function
  const exitSession = async () => {
    const fetch = await fetchCurrentSessionTask();
    if (!fetch) {
      Toast.show({
        type: "error",
        text1: "No session",
        text2: "No session active, create one to continue.",
      });
      return;
    }
    const parsed = fetch ? JSON.parse(fetch) : [];

    open("confirm-modal");
    notification.content = `${parsed.title} terminated before completion!`;
    notification.title = "exit";
  };

  //remove the session after confirm
  const handleConfirm = () => {
    updateNotifications(notification);
    setMessage("Task terminated");
    purgeCurrentSession();
    purgePausedAt();
    countRef.current = 0;
    setTimeLeft(0);
    setTask(undefined);
    taskRef.current = null;
    close("confirm-modal");

    Toast.show({
      type: "success",
      text1: "Session removed",
      text2: "Session terminated successfully!",
    });
  };
  return (
    <View className="shadow-md bg-gradient-to-br from-purple-500 to-blue-500 dark:from-slate-950 dark:to-orange-950 rounded-xl p-4 mt-14 mb-6">
      <Text className="text-white dark:text-white text-lg font-semibold mb-1">
        Current Session
      </Text>

      <Text className="text-white/90  font-medium mb-2">
        {taskRef.current?.title || message}
      </Text>
      <TouchableOpacity className="absolute right-6 " onPress={exitSession}>
        <Ionicons
          name="exit-outline"
          className="text-white dark:text-gray-200"
          size={16}
        />
      </TouchableOpacity>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-end">
          <Text className="text-white text-3xl font-bold">
            {message === "No task in session!"
              ? "00:00:00"
              : message === "Task completed!"
                ? "00:00:00"
                : formatTime(timeLeft)}
          </Text>
          <Text className="text-white/70 ml-1 mb-1 text-xs">remaining</Text>
        </View>

        <TouchableOpacity
          onPress={handlePlayPause}
          className="bg-white/20 rounded-full p-3"
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      {/* Modals */}
      <StartTaskModal onStart={fetchCurrentTask} />
      <ConfirmModal onConfirm={handleConfirm} />
      <NotificationModal notification={notification} />
    </View>
  );
};

export default CurrentSession;
