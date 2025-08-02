import React, { useRef, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TimePickerModal } from "react-native-paper-dates";
import Toast from "react-native-toast-message";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "../context/ModalContext";
import { CreateNewTask } from "../utils/MiniFunctions";

type Props = {
  visible: boolean;
  onClose: () => void;
};

type taskTypes = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
  category: string;
};

export default function AddTaskModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [time, setTime] = useState<string>("");
  const { isOpen, close } = useModal();
  const [visible, setVisible] = useState<boolean>(false);
  const selectedTimeRef = useRef<any | null>(null);
  const startTimeRef = useRef<any | null>(null);
  const [category, setCategory] = useState<string>("learning");
  const endTimeRef = useRef<any | null>(null);
  const task: any = {
    id: "",
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    duration: "",
    category: "",
  };

  const [startMinutes, setStartMinutes] = useState<number>(); // start time converted to minutes.

  // Create a new task!
  const handleSubmit = () => {
    if (!title.trim() || !duration.trim()) return;
    if (Number(duration) > 600) {
      Toast.show({
        type: "error",
        text1: "Duration too long",
        text2: "You can not have a task that lasts more than 10 hours",
      });
      setDuration("");
      return;
    }
    extractTime();
    const start = startTimeRef.current;
    const stop = endTimeRef.current;

    // Assign values to the object
    task.id = uuidv4();
    task.title = title;
    task.description = description;
    task.startTime = start;
    task.endTime = stop;
    task.duration = duration;
    task.category = category;

    reset();
    CreateNewTask(task);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setDuration("");
    // setDatetime(new Date());
    setTime("");
    selectedTimeRef.current = null;
    close("add-task");
  };

  const extractTime = () => {
    const selectedTime = selectedTimeRef.current;
    const hours = selectedTime?.hours || 0;
    const minutes = selectedTime?.minutes || 0;
    const startTime = `${hours}:${minutes}`;
    setTime(startTime);
    startTimeRef.current = startTime;

    //convert start time to minutes

    const startingMinutes = hours * 60 + minutes + Number(duration);
    setStartMinutes(startingMinutes);

    //convert the start time in minutes back to hours:minutes format plus the duration included
    const endingTimeHour = startingMinutes && Math.floor(startingMinutes / 60);
    const endingTimeMinutes = startingMinutes && startingMinutes % 60;
    const endTime = `${endingTimeHour}:${endingTimeMinutes}`;
    endTimeRef.current = endTime;
  };
  return (
    <Modal
      animationType="slide"
      visible={isOpen("add-task")}
      onRequestClose={() => close("add-task")}
      transparent
    >
      <Pressable
        onPress={() => close("add-task")}
        className="flex-1 justify-end bg-black/50 "
      >
        <Pressable
          onPress={() => {}}
          className="bg-white z-50 dark:bg-neutral-900 p-4 rounded-t-2xl space-y-4"
        >
          <Text className="text-xl font-semibold text-neutral-900 dark:text-white">
            Add New Task
          </Text>

          {/* Task Title */}
          <TextInput
            placeholder="Task Title"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
            className="bg-neutral-300  dark:bg-neutral-800 p-3 outline-0 focus:ring-1 ring-orange-800 rounded-xl text-black dark:text-white"
          />

          {/* Description */}
          <TextInput
            placeholder="Description (optional)"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
            className="bg-neutral-300 dark:bg-neutral-800 p-3 outline-0 focus:ring-1 ring-orange-800 rounded-xl text-black dark:text-white h-24"
          />

          {/* start time */}
          <View className=" flex-row justify-between  w-full space-x-3 ">
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className={`${selectedTimeRef.current !== null && "bg-primary-sButton"} min-w-[40%] flex-1 bg-orange-800 p-3 rounded-xl items-center`}
            >
              <Text
                className={`${selectedTimeRef.current !== null && "text-gray-950"} text-white font-semibold`}
              >{`${selectedTimeRef.current === null ? "Select Time" : "Time Selected!"}`}</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="start time (optional)"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={` ${selectedTimeRef.current !== null ? selectedTimeRef.current.hours : "0"} ${selectedTimeRef.current === null ? "" : ":"} ${selectedTimeRef.current !== null ? selectedTimeRef.current.minutes : ""}`}
              className="bg-neutral-300  flex-1 max-w-[50%] dark:bg-neutral-800 p-3 outline-0 focus:ring-1 ring-orange-800 rounded-xl text-black dark:text-white"
            />
          </View>

          {/* duration */}
          <TextInput
            placeholder="Duration (minutes)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            className="bg-neutral-300 dark:bg-neutral-800 p-3 outline-0 focus:ring-1 ring-orange-800 rounded-xl text-black dark:text-white"
          />

          {/* <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="flex-row items-center justify-between bg-neutral-100 dark:bg-neutral-800 p-3 rounded-xl"
          >
            <Text className="text-black dark:text-white">
              {datetime.toLocaleString()}
            </Text>
            <Ionicons name="calendar" size={20} color="gray" />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={datetime}
              mode="datetime"
              is24Hour
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, selected) => {
                setShowPicker(false);
                if (selected) setDatetime(selected);
              }}
            />
          )} */}
          {/* CATEGORIES */}
          <View>
            <Text className="dark:text-white font-semibold text-[16px] ">
              Category
            </Text>
            <View className="flex-1 items-center justify-between mt-2 mb-2 flex-row px-4">
              <View className="flex flex-row gap-2">
                <TouchableOpacity
                  onPress={() => {
                    category === "work" || category === ""
                      ? setCategory("learning")
                      : setCategory("");
                  }}
                  className={`${category === "learning" ? "bg-primary-pButton  border-orange-800" : ""} h-4 rounded-full w-4 border-2 dark: border-gray-500`}
                />
                <Text className="dark:text-white">Learning</Text>
              </View>
              <View className="flex flex-row gap-2">
                <TouchableOpacity
                  onPress={() => {
                    category === "learning" || category === ""
                      ? setCategory("work")
                      : setCategory("");
                  }}
                  className={`${category === "work" ? "bg-primary-pButton  border-orange-800" : ""} h-4 rounded-full w-4 border-2 dark: border-gray-500`}
                />
                <Text className="dark:text-white">work</Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between space-x-3">
            <TouchableOpacity
              onPress={reset}
              className="flex-1 bg-primary-sButton dark:bg-neutral-700 p-3 rounded-xl items-center"
            >
              <Text className="text-black dark:text-white">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              className="flex-1 bg-primary-pButton p-3 rounded-xl items-center"
            >
              <Text className="text-white font-semibold">Add Task</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>

      {/* Time picker modal */}
      <TimePickerModal
        visible={visible}
        animationType="fade"
        onDismiss={() => setVisible(false)}
        onConfirm={(params) => {
          setVisible(false);
          selectedTimeRef.current = params;
        }}
        hours={time?.hours}
        minutes={time?.minutes}
      />
    </Modal>
  );
}
