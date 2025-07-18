import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const ALL_TASKS = "focus-all-tasks";
const CURRENT_SESSION = "focus-current-session";
const COMPLETED_TASKS = "focus-completed-tasks";

type TaskTypes = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
};

//creating new tasks
export async function CreateNewTask(params: TaskTypes) {
  const existingData: any = await AsyncStorage.getItem(ALL_TASKS);
  const parsed = existingData ? JSON.parse(existingData) : [];
  const newData = [...parsed, params];
  try {
    await AsyncStorage.setItem(ALL_TASKS, JSON.stringify(newData));
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Task created successfully",
    });
  } catch (err) {
    console.log("AsyncStorage---", err);
  }
}

//fetching all tasks from storage
export async function getAllTasks() {
  const rawData = await AsyncStorage.getItem(ALL_TASKS);

  return rawData;
}

//creating a task for current session
export async function createNewSession(params: TaskTypes) {
  try {
    await AsyncStorage.setItem(CURRENT_SESSION, JSON.stringify(params));
  } catch (err) {
    console.log("AsyncStorage---", err);
  }
}

//removing task from current session
export async function purgeCurrentSession() {
  await AsyncStorage.removeItem(CURRENT_SESSION);
  console.log("current item removed from session");
}

//fetching a task from current session
export async function fetchCurrentSessionTask() {
  const task = await AsyncStorage.getItem(CURRENT_SESSION);
  return task;
}

//create and update list of completed tasks
export async function updateCompletedTasks(params: TaskTypes) {
  const rawData = await AsyncStorage.getItem(COMPLETED_TASKS);
  const parsedData = rawData ? JSON.parse(rawData) : [];
  const updatedData = [...parsedData, params];
  await AsyncStorage.setItem(COMPLETED_TASKS, JSON.stringify(updatedData));
}
