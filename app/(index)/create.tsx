import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { Colors, zincColors } from "@/constants/Colors";
import { create } from "zustand";
import { storage } from "@/lib/storage";
import { useRouter } from "expo-router";
import * as Crypto from "expo-crypto";
import { Habit } from "@/types";

type HabitStore = {
  habit: Omit<Habit, "id" | "currentStreak" | "bestStreak" | "date">;
  setHabit: (newHabit: Partial<Habit>) => void;
};

const useHabitStore = create<HabitStore>((set) => ({
  habit: {
    name: "",
    emoji: "🔥",
    days: [],
  },
  setHabit: (newHabit) =>
    set((state) => ({
      habit: { ...state.habit, ...newHabit },
    })),
}));

const CreateScreen = () => {
  const router = useRouter();
  const { habit, setHabit } = useHabitStore();
  const colorScheme = useColorScheme();
  const dayBgColor = colorScheme === "dark" ? "#333" : "#11181C";

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleDay = (day: string) => {
    setHabit({
      days: habit.days.includes(day)
        ? habit.days.filter((d) => d !== day)
        : [...habit.days, day],
    });
    console.warn("Habit Created:", habit);
  };

  const handleCreateHabit = () => {
    if (!habit.name.trim() || habit.days.length === 0) {
      console.warn("Please enter a habit name and select at least one day.");
      return;
    }

    const newHabit: Habit = {
      id: Crypto.randomUUID(),
      name: habit.name,
      emoji: habit.emoji,
      days: habit.days,
      currentStreak: 0,
      bestStreak: 0,
      date: new Date().toISOString(),
    };

    const existingHabits = storage.getString("habits");
    const parsedHabits: Habit[] = existingHabits
      ? JSON.parse(existingHabits)
      : [];

    const newHabits = [...parsedHabits, newHabit];

    storage.set("habits", JSON.stringify(newHabits));
    console.warn("Habit Created:", newHabit);

    setHabit({ name: "", emoji: "🔥", days: [] });

    router.push("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>Create a new habit</Text>

          <View style={styles.sectionInput}>
            <ThemedText style={styles.label}>Name</ThemedText>
            <View style={styles.row}>
              <TextInput
                placeholder="Workout"
                style={styles.input}
                value={habit.name}
                onChangeText={(text) => setHabit({ name: text })}
              />
              <TouchableOpacity style={styles.emote}>
                <Text style={styles.textEmote}>{habit.emoji}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionFrequency}>
            <View style={styles.textFrequency}>
              <ThemedText style={styles.label}>Frequency</ThemedText>
              <Text style={styles.textGray}>Choose at least 1 day</Text>
            </View>

            <View style={styles.sectionDay}>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.bgDay,
                    { backgroundColor: dayBgColor },
                    habit.days.includes(day) && { backgroundColor: "#FF9500" },
                  ]}
                  onPress={() => toggleDay(day)}
                >
                  <Text style={styles.textDate}>{day[0]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button onPress={handleCreateHabit}>Create habit</Button>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    height: "100%",
    padding: 16,
  },
  section: {
    marginTop: 20,
  },
  title: {
    fontFamily: "Chivo_800ExtraBold",
    fontSize: 25,
    color: Colors.light.tint,
  },
  sectionInput: {
    marginTop: 10,
  },
  label: {
    fontWeight: "500",
    marginBottom: 5,
    fontSize: 15,
  },
  input: {
    height: 50,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emote: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textEmote: {
    fontSize: 25,
  },
  sectionFrequency: {
    flexDirection: "column",
    marginTop: 15,
    marginBottom: 15,
  },
  textFrequency: {
    flexDirection: "column",
    gap: 2,
  },
  textGray: {
    fontSize: 15,
    color: zincColors[400],
  },
  sectionDay: {
    flexDirection: "row",
    gap: 5,
    marginTop: 5,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  bgDay: {
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textDate: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionReminder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
});
