import {
  ViewStyle,
  TextStyle,
  useColorScheme,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { forwardRef } from "react";
import { amberColors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = forwardRef<typeof TouchableOpacity, ButtonProps>(
  (
    {
      onPress,
      variant = "filled",
      size = "md",
      disabled = false,
      loading = false,
      children,
      style,
      textStyle,
    }: ButtonProps,
    ref
  ) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const sizeStyles: Record<
      ButtonSize,
      { height: number; fontSize: number; padding: number }
    > = {
      sm: { height: 36, fontSize: 14, padding: 12 },
      md: { height: 44, fontSize: 16, padding: 16 },
      lg: { height: 55, fontSize: 18, padding: 20 },
    };

    const getVariantStyle = () => {
      const baseStyle: ViewStyle = {
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      };

      switch (variant) {
        case "filled":
          return {
            ...baseStyle,
            backgroundColor: isDark ? amberColors[50] : amberColors[900],
          };
        case "ghost":
          return {
            ...baseStyle,
            backgroundColor: "transparent",
            borderWidth: 0,
            borderColor: isDark ? amberColors[700] : amberColors[300],
          };
        case "outline":
          return {
            ...baseStyle,
            backgroundColor: "transparent",
          };
      }
    };

    const getTextColor = () => {
      if (disabled) {
        return isDark ? amberColors[500] : amberColors[400];
      }

      switch (variant) {
        case "filled":
          return isDark ? amberColors[900] : amberColors[50];
        case "outline":
        case "ghost":
          return amberColors[900];
      }
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          getVariantStyle(),
          {
            height: sizeStyles[size].height,
            paddingHorizontal: sizeStyles[size].padding,
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <ThemedText
            style={StyleSheet.flatten([
              {
                fontSize: sizeStyles[size].fontSize,
                color: getTextColor(),
                textAlign: "center",
                marginBottom: 0,
                fontWeight: "700",
              },
              textStyle,
            ])}
          >
            {children}
          </ThemedText>
        )}
      </TouchableOpacity>
    );
  }
);

export default Button;
