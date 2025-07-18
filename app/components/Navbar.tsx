import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useModal } from "../context/ModalContext";

const Navbar = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [date, setDate] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const { open } = useModal();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturady",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useFocusEffect(
    useCallback(() => {
      calculateDate();
    }, [])
  );

  const calculateDate = () => {
    const today = new Date();
    // get the day of week
    const dayNumber = today.getDay();
    const day = weekDays[dayNumber];
    // get the month of year
    const monthNumber = today.getMonth();
    const month = months[monthNumber].slice(0, 3);

    //calculate the exact timeframe of the day, for greetings
    const hours = today.getHours();
    if (hours < 12) {
      setGreeting("morning");
    } else if (hours < 18) {
      setGreeting("afternoon");
    } else {
      setGreeting("evening");
    }

    //get the date of the month
    const currentDate = today.getDate();
    // combine the full date
    const fullDate = `${day}, ${month} ${currentDate}`;
    setDate(fullDate);
  };

  return (
    <View className="flex-row shadow-md px-3 bg-white/70 backdrop-blur-sm dark:bg-gradient-to-tr dark:from-orange-950 dark:to-slate-950 pb-2  justify-between pt-6 items-center   absolute left-0 top-0 right-0 z-50">
      <View className=" ">
        <Text className="text-lg  font-bold text-gray-900 dark:text-white">
          Good {greeting}, Dickens
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">{date}</Text>
      </View>
      {/* theme button */}
      <Pressable
        onPress={() =>
          setColorScheme(colorScheme === "dark" ? "light" : "dark")
        }
      >
        <Ionicons
          name={colorScheme === "light" ? "moon-sharp" : "sunny-sharp"}
          size={20}
          className="text-orange-900 dark:text-gray-500"
        />
      </Pressable>

      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={16} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="menu" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
