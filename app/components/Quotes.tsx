import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import quotes from "../../assets/quotes.json";

const LAST_SEEN_DATE = "focus-last-date";
const LAST_SEEN_ID = "focus-last-id";

const Quotes = () => {
  const idRef = useRef<number>(0);
  const [id, setId] = useState<number>(0);
  useEffect(() => {
    const checkDay = async () => {
      const today = getTodayDate();
      //get the previous id from storage
      const id = await AsyncStorage.getItem(LAST_SEEN_ID);
      idRef.current = id ? Number(id) : 0;
      setId(Number(id));
      //get the previous date from storage
      const saved = await AsyncStorage.getItem(LAST_SEEN_DATE);

      if (today !== saved) {
        console.log("It's a new day");
        idRef.current += 1;
        await AsyncStorage.setItem(LAST_SEEN_DATE, today);
        await AsyncStorage.setItem(LAST_SEEN_ID, JSON.stringify(idRef.current));
      } else {
        console.log("Its still today");
      }
    };
    checkDay();
  }, []);
  //get todays date
  const getTodayDate = () => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    return todayDate;
  };

  //store the date of the new day
  const storeDate = async () => {
    const today = getTodayDate();
    await AsyncStorage.setItem(LAST_SEEN_DATE, today);
  };
  const quote = quotes[id];

  return (
    <View className="shadow-lg shadow-black/70 bg-gradient-to-tl from-indigo-500 to-purple-600 dark:from-orange-950 dark:to-gray-950 rounded-xl p-6 mb-10">
      <Ionicons name="chatbox" size={24} color="white" className="mb-2" />
      <Text>{quote.id}</Text>
      <Text className="text-white text-lg italic font-medium mb-2">
        {quote.quote}
      </Text>

      <Text className="text-white/80 text-sm">— {quote.author}</Text>
    </View>
  );
};

export default Quotes;
