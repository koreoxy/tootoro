import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { zincColors } from "@/constants/Colors";
import { eachDayOfInterval, format, subDays } from "date-fns";

const HabitDetailScreen = () => {
  const today = new Date();
  const startDate = subDays(today, 364);
  const days: Date[] = eachDayOfInterval({ start: startDate, end: today });

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  days.forEach((day: Date, index: number) => {
    currentWeek.push(day);
    if ((index + 1) % 7 === 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const getColor = (day: Date): string => {
    const randomIntensity = Math.floor(Math.random() * 4); // Simulasi tingkat aktivitas
    return ["#EDEDED", "#A8E6CF", "#56B881", "#37966F"][randomIntensity];
  };

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const monthLabels: { [key: string]: boolean } = {};
  weeks.forEach((week) => {
    const month = format(week[0], "MMM");
    monthLabels[month] = true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scroll}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionStreak}>
            <View style={styles.contentStreak}>
              <Text style={styles.title}>Current Streak</Text>
              <Text style={styles.text}>4 🔥</Text>
            </View>

            <View
              style={{
                borderLeftColor: "#000",
                borderLeftWidth: StyleSheet.hairlineWidth,
                alignContent: "center",
              }}
            />

            <View style={styles.contentStreak}>
              <Text style={styles.title}>Best Streak</Text>
              <Text style={styles.text}>20 🔥</Text>
            </View>
          </View>

          <View style={styles.sectionRepitions}>
            <Text style={styles.titleRep}>Total Repetitions</Text>
            <Text style={styles.textRep}>Since July 22, 2024 (224 days)</Text>
            <Text style={styles.textTotal}>Total 152</Text>

            <ScrollView horizontal style={styles.scrollContainer}>
              <View>
                <View style={styles.monthRow}>
                  <Text style={styles.emptyLabel} />
                  {Object.keys(monthLabels).map((month, colIndex) => (
                    <Text key={colIndex} style={styles.monthLabel}>
                      {month}
                    </Text>
                  ))}
                </View>
                <View style={styles.gridContainer}>
                  <View>
                    {dayLabels.map((label, index) => (
                      <Text key={index} style={styles.dayLabel}>
                        {label}
                      </Text>
                    ))}
                  </View>
                  {weeks.map((week, colIndex) => (
                    <View key={colIndex} style={styles.column}>
                      {week.map((day, rowIndex) => (
                        <View
                          key={rowIndex}
                          style={[
                            styles.box,
                            { backgroundColor: getColor(day) },
                          ]}
                        />
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.sectionB}>
            <Text style={styles.titleB}>Completion Rate</Text>
            <Text style={styles.textB}>67%</Text>
          </View>

          <View style={styles.sectionB}>
            <Text style={styles.titleB}>Frequency</Text>
            <Text style={styles.textB}>Daily</Text>
          </View>

          <View style={styles.sectionB}>
            <Text style={styles.titleB}>Reminder</Text>
            <Text style={styles.textB}>12:00 AM</Text>
          </View>

          <View style={[styles.sectionB, { marginBottom: 120 }]}>
            <Text style={styles.titleB}>Habit Created on</Text>
            <Text style={styles.textB}>July 22, 2024</Text>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default HabitDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    height: "100%",
    // padding: 16,
  },
  scroll: {
    marginTop: 10,
    marginBottom: "auto",
    padding: 10,
  },
  sectionStreak: {
    marginTop: 25,
    backgroundColor: "#F1F3E7",
    padding: 15,
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    borderRadius: 10,
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  contentStreak: {
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  sectionRepitions: {
    marginTop: 25,
    backgroundColor: "#F1F3E7",
    padding: 15,
    flexDirection: "column",
    gap: 5,
    borderRadius: 10,
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  titleRep: {
    fontWeight: "bold",
  },
  textRep: {
    color: zincColors[400],
  },
  textTotal: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  sectionB: {
    marginTop: 10,
    backgroundColor: "#F1F3E7",
    padding: 15,
    flexDirection: "column",
    gap: 5,
    borderRadius: 10,
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  titleB: {
    fontWeight: "bold",
    fontSize: 18,
  },
  textB: {
    fontWeight: "400",
    fontSize: 15,
  },
  scrollContainer: {
    marginTop: 5,
  },
  monthRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  emptyLabel: {
    width: 15,
    textAlign: "right",
  },
  monthLabel: {
    width: 25,
    textAlign: "center",
    fontSize: 10,
    marginRight: 4,
  },
  gridContainer: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    marginRight: 4,
  },
  box: {
    width: 15,
    height: 15,
    margin: 2,
    borderRadius: 3,
  },
  dayLabel: {
    fontSize: 10,
    textAlign: "right",
    width: 15,
    marginBottom: 2,
  },
});
