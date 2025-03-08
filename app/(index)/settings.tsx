import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { storage } from "@/lib/storage";
import { useMMKVBoolean } from "react-native-mmkv";
import { Colors } from "@/constants/Colors";

const SettingsScreen = () => {
  const [dark, setDark] = useMMKVBoolean("dark-mode", storage);

  const toggleDark = () => setDark((prev) => !!!prev);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>Settings</Text>

          <View style={styles.sectionContent}>
            <View style={styles.sectionContentBody}>
              <View style={styles.icon}>
                <MaterialIcons name="light-mode" size={24} color="black" />
                <Text>Theme</Text>
              </View>
              <Switch
                onValueChange={toggleDark}
                value={dark}
                trackColor={{ true: "#000" }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "#d4d4d8",
                borderBottomWidth: StyleSheet.hairlineWidth,
                alignContent: "center",
              }}
            />
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 5, padding: 2 }}
            >
              <MaterialIcons name="backup" size={24} color="black" />
              <View>
                <Text style={{ fontWeight: "bold" }}>Backups</Text>
                <Text>Export and import your data</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
  section: {
    marginTop: 20,
  },
  title: {
    fontFamily: "Chivo_800ExtraBold",
    fontSize: 25,
    color: Colors.light.tint,
  },
  sectionContent: {
    marginTop: 10,
    flexDirection: "column",
    backgroundColor: "#F1F3E7",
    padding: 15,
    gap: 5,
    borderRadius: 10,
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  sectionContentBody: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
