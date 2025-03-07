import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  useFonts,
  Chivo_500Medium,
  Chivo_800ExtraBold,
  Chivo_900Black,
  Chivo_400Regular_Italic,
  Chivo_500Medium_Italic,
} from "@expo-google-fonts/chivo";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMMKVBoolean } from "react-native-mmkv";
import { storage } from "@/lib/storage";
import { Appearance, Platform } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [dark] = useMMKVBoolean("dark-mode", storage);

  useEffect(() => {
    if(Platform.OS !== 'web') {
      Appearance.setColorScheme(dark ? "dark" : "light");
    }
  }, [dark])

  let [fontsLoaded] = useFonts({
    Chivo_500Medium,
    Chivo_800ExtraBold,
    Chivo_900Black,
    Chivo_400Regular_Italic,
    Chivo_500Medium_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(index)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
