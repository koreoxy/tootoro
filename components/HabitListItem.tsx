import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Habit } from "@/types";

type HabitListItemProps = {
  habit: Habit;
};

const HabitListItem = ({ habit }: HabitListItemProps) => {
  return (
    <Link href={"/"} asChild>
      <Pressable style={styles.card}>
        <View style={styles.content}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <View style={styles.iconSection}>
              <Text style={styles.icon}>{habit.icon}</Text>
            </View>
            <Text style={styles.name}>{habit.name}</Text>
          </View>

          <View style={styles.streakSection}>
            <Text>🔥</Text>
            <Text>{habit.currentStreak}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default HabitListItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F1F3E7",
    padding: 15,
    borderRadius: 10,
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  content: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconSection: {
    backgroundColor: "#E4E7D9",
    width: 45,
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    textAlign: "center",
  },
  streakSection: {
    flexDirection: "column",
    alignItems: "center",
  },
});
