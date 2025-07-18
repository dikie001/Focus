import React from "react";
import { ScrollView, View } from "react-native";
import Categories from "./components/Categories";
import CurrentSession from "./components/CurrentSession";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import QuickActions from "./components/QuickActions";
import Quotes from "./components/Quotes";
import RecentActivity from "./components/RecentActivity";
import { ModalProvider } from "./context/ModalContext";
import AddTaskModal from "./modals/AddTaskModal";
import StartTaskModal from "./modals/StartTaskModal";
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <ModalProvider>
      <View className="flex-1 bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:to-neutral-950 px-4 pt-12">
        <Navbar />
        <ScrollView
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
      <StartTaskModal/>
      <Toast/>
    </ModalProvider>
  );
}
