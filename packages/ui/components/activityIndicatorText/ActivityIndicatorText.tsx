import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { textStyles, theme } from "../../theme";

export const ActivityIndicatorText = ({
  text,
  style,
}: {
  text: string;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.loadingContainer, style]}>
      <Text style={styles.loadingText}>{text}</Text>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    ...textStyles.body_sub,
    color: theme.colors.text_primary_dark_60,
    marginBottom: theme.spacing.xs,
  },
});
