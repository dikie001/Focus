import React from "react";
import { ScrollView, View } from "react-native";
import Categories from "./components/Categories";
import CurrentSession from "./components/CurrentSession";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import QuickActions from "./components/QuickActions";
import Quotes from "./components/Quotes";
import RecentActivity from "./components/RecentActivity";
import { ModalProvider } from "./context/AddTaskContext";
import AddTaskModal from "./modals/AddTaskModal";

export default function App() {
  return (
    <ModalProvider>
      <View className="flex-1 bg-white dark:bg-neutral-900 px-6 pt-12">
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
    </ModalProvider>
  );
}
