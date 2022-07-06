import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../../theme";

export const RoundedScreenCorners = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  inner: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: theme.borderRadius.regular / 2,
  },
});
