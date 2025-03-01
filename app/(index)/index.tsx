import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Appearance, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
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
        <ThemedText style={styles.title}>
          Create your habit with TooToro
        </ThemedText>
        <Switch onValueChange={toggleDark} value={dark} />
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    height: "100%",
    padding: 16,
  },
  title: {
    fontFamily: "Chivo_800ExtraBold",
    fontSize: 25,
    color: Colors.light.tint,
  },
});

export default HomeScreen;
