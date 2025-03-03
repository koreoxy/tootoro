import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { format, addDays, isToday } from "date-fns";

const TOTAL_DAYS = 15;
const MIDDLE_INDEX = Math.floor(TOTAL_DAYS / 2);

const DateCarousel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const flatListRef = useRef<FlatList>(null);

  const getDates = () => {
    return Array.from({ length: TOTAL_DAYS }, (_, i) =>
      addDays(new Date(), i - MIDDLE_INDEX)
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={getDates()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.toISOString()}
        initialScrollIndex={MIDDLE_INDEX}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
        renderItem={({ item }) => {
          const today = isToday(item);
          return (
            <TouchableOpacity
              style={[styles.dateContainer, today && styles.today]}
              onPress={() => setSelectedDate(item)}
            >
              <Text style={[styles.dayText, today && styles.todayText]}>
                {format(item, "EEE")}
              </Text>
              <Text style={[styles.dateText, today && styles.todayText]}>
                {format(item, "d")}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DateCarousel;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  dateContainer: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 1,
    borderRadius: 10,
    marginHorizontal: 1,
    width: 50,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  today: {
    backgroundColor: "#FF9500",
    borderRadius: 10,
    paddingVertical: 12,
  },
  todayText: {
    color: "#fff",
  },
});
