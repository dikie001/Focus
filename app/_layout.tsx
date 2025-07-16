import { Stack } from "expo-router";
import ThemeProvider from "./providers/ThemeProvider";
import '../global.css'
export default function RootLayout() {
  return (
    <ThemeProvider>
      <>
        <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
     </Stack>
      </>
    </ThemeProvider>
  );
}
