import Button from "@/components/Button";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Character1 from "@/assets/images/C1.svg";
import Wave1 from "@/assets/images/wave1.svg";
import Chat from "@/assets/images/chat.svg";

import { useEffect, useState } from "react";

export default function Index() {
  const text = `Let's make your \nhabit together.`;
  const [visibleText, setVisibleText] = useState<string>("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.sectionHeading}>
          <Text style={styles.title}>
            Tootoro Turn Good Habits into Fun Adventures!
          </Text>

          {/* Efek Animasi Mengetik */}
          <Text style={styles.animatedText}>{visibleText}</Text>

          <Character1 width={300} height={300} style={styles.image} />
          <Wave1
            width={200}
            height={150}
            style={styles.wave1}
            fill={Colors.light.tint}
          />
          <Wave1
            width={300}
            height={150}
            style={styles.wave2}
            fill={Colors.light.tint}
          />
          <Chat width={200} height={150} style={styles.chat} />
        </View>

        <Link href={"/(index)/home"} asChild>
          <Button>Let's Start</Button>
        </Link>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    height: "100%",
    padding: 16,
  },
  sectionHeading: {
    flex: 1,
  },
  title: {
    fontFamily: "Chivo_800ExtraBold",
    fontSize: 50,
    color: Colors.light.tint,
  },
  image: {
    position: "absolute",
    top: 310,
    left: 70,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  wave1: {
    position: "absolute",
    top: -10,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  wave2: {
    position: "absolute",
    top: 170,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  chat: {
    position: "absolute",
    top: 255,
    left: 0,
    zIndex: 0,
  },
  animatedText: {
    fontSize: 18,
    fontFamily: "Chivo_500Medium_Italic",
    color: "#FFF",
    position: "absolute",
    top: 295,
    left: 16,
    zIndex: 1,
  },
});
