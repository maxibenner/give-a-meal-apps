import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { textStyles, theme } from "../../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

export type ToastWithCounter = {
  title: string;
  info: string;
  counter: number;
  counterLabel: string;
  style?: ViewStyle;
};

export const ToastWithCounter = ({
  title,
  info,
  counter,
  counterLabel,
  style,
}: ToastWithCounter) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.counterBG}>
        <Text style={styles.counter}>{counter}</Text>
        <Text style={styles.counterSub}>{counterLabel}</Text>
      </View>

      <View style={styles.rightSideContainer}>
        <View style={styles.textContent}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.sub}>
            {info}
          </Text>
        </View>

        {/* <View style={styles.arrowIcon}> */}
        <Ionicons
          name="chevron-forward"
          size={24}
          color={theme.colors.element_dark_inactive}
        />
        {/* </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg_white,
    borderRadius: theme.borderRadius.regular,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  counterBG: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.text_link,
  },
  counter: {
    ...textStyles.header_3,
    color: theme.colors.text_primary_light,
  },
  counterSub: {
    ...textStyles.body_sub,
    opacity: 1,
    color: theme.colors.text_primary_light,
  },
  rightSideContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.sm,
  },
  textContent: {
    flex: 1,
  },
  title: {
    ...textStyles.label_button,
    maxWidth: "92%",
  },
  sub: {
    ...textStyles.body_sub,
    opacity: 1,
    maxWidth: "92%",
  },
});
