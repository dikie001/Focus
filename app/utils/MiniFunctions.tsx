import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const ALL_TASKS = "focus-all-tasks";
const CURRENT_SESSION = "focus-current-session";
const COMPLETED_TASKS = "focus-completed-tasks";
const PAUSE_INTERVAL = "focus-pause-interval";
const PAUSE_AT_INTERVAL = "focus-pausedAt";
const NOTIFICATIONS = "focus-notifications";


type TaskTypes = {
  id: string;
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
export async function updateCompletedTasks(params: any) {
  const rawData = await AsyncStorage.getItem(COMPLETED_TASKS);
  const parsedData = rawData ? JSON.parse(rawData) : [];
  const updatedData = [...parsedData, params];
  try {
    await AsyncStorage.setItem(COMPLETED_TASKS, JSON.stringify(updatedData));
  } catch (err) {
    console.log("AsyncStorage---", err);
  }
}

//pause/play the interval     //play or pause
export async function savePauseStatus(params: string) {
  await AsyncStorage.setItem(PAUSE_INTERVAL, JSON.stringify(params));
}
// get  the interval for play/pause
export async function getPause() {
  const playInterval = await AsyncStorage.getItem(PAUSE_INTERVAL);
  const parsedData: string = playInterval ? JSON.parse(playInterval) : null;
  return parsedData;
}

//save the pausedAtRef to the storage   //00:00:00
export async function savePausedAt(params: number | null) {
  await AsyncStorage.setItem(PAUSE_AT_INTERVAL, JSON.stringify(params));
}

//get the pausedAtRef from storage
export async function getPausedAt() {
  const pausedAt = await AsyncStorage.getItem(PAUSE_AT_INTERVAL);
  const parsedData = pausedAt ? JSON.parse(pausedAt) : null;
  return parsedData;
}
//purge the pausedAtRef from storage
export async function purgePausedAt() {
  await AsyncStorage.removeItem(PAUSE_AT_INTERVAL);
}

// delete task with specific id from focus-all-tasks
export async function Delete(params: string) {
  const allTasks = await AsyncStorage.getItem(ALL_TASKS);
  const parsedTasks = allTasks ? JSON.parse(allTasks) : [];
  const itemToDelete = parsedTasks.find(
    (item: TaskTypes) => item.id === params
  );
  const filteredItems = parsedTasks.filter(
    (item: TaskTypes) => item !== itemToDelete
  );

  //get the existing items in completed-tasks
  const existing = await AsyncStorage.getItem(COMPLETED_TASKS);
  const parsed = existing ? JSON.parse(existing) : [];
  const updated = [...parsed, itemToDelete]

  try {
    await AsyncStorage.setItem(ALL_TASKS, JSON.stringify(filteredItems));
    await AsyncStorage.setItem(COMPLETED_TASKS, JSON.stringify(updated))
  } catch (err) {
    console.log("AsyncStorage---", err);
  }
}


//get and update all notifications from storage
export async function updateNotifications(params: any){
  console.log("params-content",params.content)
  const existingData = await AsyncStorage.getItem(NOTIFICATIONS)
  const parsedData = existingData? JSON.parse(existingData):[]

  // create an array containing all the content of the notification
  // to prevent diplication of notification
  const contentData = parsedData.map((item:any) => item.content)
  // loop to iterate over the contentData array and find duplicates
  for(let i=0 ;i<=contentData.length; i++){
    if(params.content === contentData[i]){
      console.log("Found similar content!!!")
      console.log('notif update suspended')
      return
    }
  }
  const updatedData = [...parsedData,params ]
  AsyncStorage.setItem(NOTIFICATIONS, JSON.stringify(updatedData))
  console.log("done..")
}