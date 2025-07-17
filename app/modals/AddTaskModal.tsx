import React, { useRef, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TimePickerModal } from "react-native-paper-dates";
import { useModal } from "../context/AddTaskContext";

type Props = {
  visible: boolean;
  onClose: () => void;
};

type TaskType = {
  title: string;
  description: string;
  duration: string;
  datetime: Date;
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
  const endTimeRef = useRef<any | null>(null);

  const [startMinutes, setStartMinutes] = useState<number>(); // start time converted to minutes.

  // Create a new task!
  const handleSubmit = () => {
    if (!title.trim() || !duration.trim()) return;
    extractTime();
    const start = startTimeRef.current;
    const stop = endTimeRef.current;
    console.table(
      "start-",
      start,
      "stop-",
      stop,
      "title-",
      title,
      "description-",
      description
    );

    reset();
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setDuration("");
    // setDatetime(new Date());
    setTime("");
    selectedTimeRef.current = null;
    close();
  };

  const extractTime = () => {
    const selectedTime = selectedTimeRef.current;
    const hours = selectedTime.hours;
    const minutes = selectedTime.minutes;
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
      visible={isOpen}
      onRequestClose={close}
      transparent
    >
      <View className="flex-1 justify-end bg-black/50 ">
        <View className="bg-white dark:bg-neutral-900 p-4 rounded-t-2xl space-y-4">
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
              className={`${selectedTimeRef.current !== null && "bg-neutral-400"} flex-1 bg-orange-800 p-3 rounded-xl items-center`}
            >
              <Text className="text-white font-semibold">{`${selectedTimeRef.current === null ? "Select Time" : "Time Selected!"}`}</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="start time (optional)"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={` ${selectedTimeRef.current !== null ? selectedTimeRef.current.hours : "0"} ${selectedTimeRef.current === null ? "" : ":"} ${selectedTimeRef.current !== null ? selectedTimeRef.current.minutes : ""}`}
              className="bg-neutral-300  flex-1 dark:bg-neutral-800 p-3 outline-0 focus:ring-1 ring-orange-800 rounded-xl text-black dark:text-white"
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

          <View className="flex-row justify-between space-x-3">
            <TouchableOpacity
              onPress={reset}
              className="flex-1 bg-neutral-400 dark:bg-neutral-700 p-3 rounded-xl items-center"
            >
              <Text className="text-black dark:text-white">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              className="flex-1 bg-orange-800 p-3 rounded-xl items-center"
            >
              <Text className="text-white font-semibold">Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
