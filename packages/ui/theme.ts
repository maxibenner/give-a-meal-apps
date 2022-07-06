import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    text_primary_dark: "#1D1D1F",
    text_primary_dark_60: "rgba(0, 0, 0, 0.40)",
    text_primary_dark_placeholder: "rgba(29, 29, 31, 0.60)",
    text_primary_light: "#ffffff",
    text_link: "#3C7EF8",
    text_error: "#FF1F1F",

    element_dark_active: "#1D1D1F",
    element_dark_inactive: "rgba(29, 29, 31, 0.15)",

    button_primary_bg: "#1D1D1F",
    button_secondary_bg: "rgba(29, 29, 31, 0.05)",

    effect_focus: "#86B0F7",
    effect_highlight: "#3C7EF8",

    bg_white: "#ffffff",
    bg_main: "#F6F6F6",
    bg_blue: "#6A9DFC",
    bg_error: "rgba(255, 31, 31, 0.08)",
    bg_brand: "#C7FFBE",
  },
  borderRadius: {
    regular: 12,
    large: 24,
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 64,
  },
  fontSizes: {
    h1: 40,
    h2: 32,
    h3: 24,
    reg: 17,
    sm: 14,
    xs: 10,
  },
  effects: {
    shadow: {
      default: {},
    },
  },
};

export const effects = StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.element_dark_active,
    shadowOpacity: 0.02,
    shadowRadius: 5,
  },
});

export const textStyles = StyleSheet.create({
  header_1: {
    fontSize: theme.fontSizes.h1,
    color: theme.colors.text_primary_dark,
    fontWeight: "700",
  },
  header_2: {
    fontSize: theme.fontSizes.h2,
    color: theme.colors.text_primary_dark,
    fontWeight: "700",
  },
  header_3: {
    fontSize: theme.fontSizes.h3,
    color: theme.colors.text_primary_dark,
    fontWeight: "700",
  },
  header_4: {
    fontSize: theme.fontSizes.reg,
    color: theme.colors.text_primary_dark_60,
    fontWeight: "600",
  },
  label_button: {
    fontSize: theme.fontSizes.reg,
    color: theme.colors.text_primary_dark,
    fontWeight: "600",
  },
  body: {
    fontSize: theme.fontSizes.reg,
    color: theme.colors.text_primary_dark,
    fontWeight: "400",
    lineHeight: 23,
  },
  body_sub: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text_primary_dark,
    fontWeight: "400",
    opacity: 0.7,
  },
  label_input_active: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text_primary_dark,
    fontWeight: "400",
  },
});
