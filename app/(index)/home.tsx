import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Character from "@/assets/images/C2.svg";
import DateCarousel from "@/components/DateCarousel";
import Chat from "@/assets/images/chat.svg";
import HabitListItem from "@/components/HabitListItem";
import { useCallback, useState } from "react";
import { storage } from "@/lib/storage";
import { Habit } from "@/types";
import { useFocusEffect } from "expo-router";

const HomeScreen = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchHabits = () => {
        const storedHabits = storage.getString("habits");
        if (storedHabits) {
          setHabits(JSON.parse(storedHabits));
        }
      };

      fetchHabits();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <Text style={styles.title}>TooToro Habits</Text>
        <DateCarousel />
        <Character width={150} height={150} style={styles.image} />
        <Chat width={220} height={150} style={styles.chat} />
        <Text style={styles.textChat}>
          Start your day with water. {"\n"}One glass will energize you!
        </Text>
        <ScrollView
          style={styles.sectionHabitList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {habits.length > 0 ? (
            <View style={styles.grid}>
              {habits.map((habit) => (
                <HabitListItem key={habit.id} habit={habit} />
              ))}
            </View>
          ) : (
            <Text>No habits found</Text>
          )}
        </ScrollView>
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
  image: {
    position: "absolute",
    top: 220,
    left: 230,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  chat: {
    position: "absolute",
    top: 150,
    left: 60,
    zIndex: 0,
  },
  textChat: {
    fontFamily: "Chivo_500Medium_Italic",
    fontSize: 15,
    color: "#fff",
    position: "absolute",
    top: 195,
    left: 70,
    zIndex: 0,
  },
  sectionHabitList: {
    marginTop: 230,
  },
  grid: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gap: 10,
    maxWidth: "100%",
    padding: 5,
    marginBottom: 100,
  },
});

export default HomeScreen;
