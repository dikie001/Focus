import React from "react";
import { ScrollView, View } from "react-native";
import Categories from "./components/Categories";
import CurrentSession from "./components/CurrentSession";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import QuickActions from "./components/QuickActions";
import Quotes from "./components/Quotes";
import RecentActivity from "./components/RecentActivity";

export default function App() {
  return (
    <View className="flex-1 bg-white dark:bg-black px-6 pt-12">
      <Navbar />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <CurrentSession />
        <QuickActions />
        <Dashboard />
        <Categories />
        <RecentActivity />
        <Quotes />
      </ScrollView>
    </View>
  );
}
