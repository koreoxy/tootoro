import {
  Appearance,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";

const SettingsScreen = () => {
  const [dark, setDark] = useState(Appearance.getColorScheme() === "dark");

  const toggleDark = () => {
    const newTheme = dark ? "light" : "dark";
    setDark(!dark);
    Appearance.setColorScheme?.(newTheme);
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDark(colorScheme === "dark");
    });

    return () => subscription.remove();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <Switch onValueChange={toggleDark} value={dark} />
      </ThemedView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    height: "100%",
    padding: 16,
  },
});
