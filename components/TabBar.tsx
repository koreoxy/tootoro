import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text } from "@react-navigation/elements";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useColorScheme();
  const backgroundColor = theme === "dark" ? "#F8F3D9" : "#232323";
  const primaryColor = theme === "dark" ? "#27272a" : "#F8F3D9";
  const greyColor = theme === "dark" ? "#A0A0A0" : "#737373";
  const bgColorCreate = theme === "dark" ? "#737373" : "#FF9500";

  const icons: Record<string, (props: { color: string }) => JSX.Element> = {
    home: (props) => <FontAwesome name="home" size={26} {...props} />,
    settings: (props) => <FontAwesome name="gear" size={26} {...props} />,
    create: (props) => <AntDesign name="pluscircle" size={20} {...props} />,
  };

  const customLabels: Record<string, string> = {
    home: "Home",
    settings: "Profile",
    create: "Create",
  };

  return (
    <View style={[styles.tabbar, { backgroundColor }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let label: string = customLabels[route.name] || route.name;

        if (typeof options.tabBarLabel === "string") {
          label = options.tabBarLabel;
        } else if (typeof options.tabBarLabel === "function") {
          label = options.tabBarLabel({
            focused: isFocused,
            color: isFocused ? primaryColor : greyColor,
            position: "below-icon",
            children: route.name,
          }) as string;
        }

        if (["_sitemap", "+not-found", "[id]"].includes(route.name))
          return null;

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              if (!isFocused) {
                navigation.navigate(route.name, route.params);
              }
            }}
            style={({ pressed }) => [
              styles.tabbarItem,
              route.name === "create" && [
                styles.createTabStyle,
                { backgroundColor: bgColorCreate },
              ],
              pressed && styles.pressedEffect,
            ]}
          >
            {icons[route.name]?.({
              color: isFocused ? primaryColor : greyColor,
            }) ?? null}
            {route.name === "create" && (
              <Text style={styles.createTabText}>{label}</Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  createTabStyle: {
    borderRadius: 50,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignContent: "center",
    gap: 8,
  },
  createTabText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  pressedEffect: {
    opacity: 0.7,
  },
});

export default TabBar;
