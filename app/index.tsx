import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import Categories from "./components/Categories";
import CurrentSession from "./components/CurrentSession";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import QuickActions from "./components/QuickActions";
import Quotes from "./components/Quotes";
import RecentActivity from "./components/RecentActivity";
import { ModalProvider } from "./context/ModalContext";
import AddTaskModal from "./modals/AddTaskModal";
import MenuModal from "./modals/MenuModal";
import { createNewSession, getAllTasks } from "./utils/MiniFunctions";

type TaskTypes = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
};

export default function App() {
  const [time, setTime] = useState<any>("");
  const timeArrayRef = useRef<any>([]);
  const taskId = useRef<any>("");
  const currentTaskRef = useRef<TaskTypes | null>(null);
  const allTasksInStorageRef=useRef<TaskTypes[] | null>(null)

  // let allTasks: TaskTypes[];

  // const handleScroll = (e: any) => {
  //   const scrolly = e.nativeEvent.contentOffset.y;
  //   if (scrolly > 400) {
  //     console.log("scrolling past 200...");
  //   }
  // };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      timeArrayRef.current?.forEach((element: string) => {
        if (!element) {
          console.log("returning....");
          return;
        }
        if (element && currentTime) {
          let status;
          console.log("active...");
          // console.log("el--", element, "cr--", currentTime);
        }

        // start running the task
        if (element === currentTime) {
          console.log("intitiating task!!!");
        const currentTask =  allTasksInStorageRef.current?.find(
           (task) => task.startTime === element
         );
          currentTask? currentTaskRef.current = currentTask: null;
          taskId.current = currentTaskRef.current?.id

          currentTaskRef.current
            ? createNewSession(currentTaskRef.current)
            : console.log("task not created");

          // console.log("session created with id: ", currentTaskRef.current?.id);
        }
      });
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    loadTasks();
  }, []);

  //load all tasks ffrom focus-all-tasks
  const loadTasks = async () => {
    const tasks = await getAllTasks();
    const parsed = tasks ? JSON.parse(tasks) : [];
    allTasksInStorageRef.current = parsed;
    timeArrayRef.current = allTasksInStorageRef.current?.map(
      (task: any) => task.startTime
    );
  };

  //due to createTask() being an async, task will be creted a bit later so i will have to slow down the update time to
  // allow for the creation to finish b4 moving on!
  const loadTasksForUpdate = () => {
    setTimeout(async () => {
      loadTasks();
    }, 100);
  };

  return (
    <ModalProvider>
      <View className="flex-1 bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:to-neutral-950 px-4 pt-12">
        <Navbar />
        <ScrollView
          // onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <CurrentSession taskId={taskId.current} />
          <QuickActions />
          <Dashboard />
          <Categories />
          <RecentActivity />
          <Quotes />
        </ScrollView>
      </View>

      {/* Modals */}
      <AddTaskModal handleConfirm={loadTasksForUpdate} />
      <MenuModal />
      {/* toasts */}
      <Toast />
    </ModalProvider>
  );
}
