import React from "react";
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
import ConfirmModal from "./modals/ConfirmModal";
import MenuModal from "./modals/MenuModal";
import NotificationModal from "./modals/NotificationModal";
import StartTaskModal from "./modals/StartTaskModal";

export default function App() {
  const handleScroll = (e: any) => {
    const scrolly = e.nativeEvent.contentOffset.y;
    if (scrolly >400) {
      console.log("scrolling past 200...");
    }
  };
  return (
    <ModalProvider>
      <View className="flex-1 bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:to-neutral-950 px-4 pt-12">
        <Navbar />
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <CurrentSession />
          <QuickActions />
          <Dashboard />
          <Categories />
          <RecentActivity />
          <Quotes />
        </ScrollView>
      </View>

      {/* Modals */}
      <AddTaskModal />
      <MenuModal />
      {/* toasts */}
      <Toast />
    </ModalProvider>
  );
}
