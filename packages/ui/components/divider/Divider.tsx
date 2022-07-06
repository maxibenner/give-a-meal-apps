import { View, StyleSheet } from "react-native";
import { theme } from "../../theme";
export const Divider = ({ spacing }: { spacing?: number }) => (
  <View style={[styles.line, { marginVertical: spacing }]} />
);

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: theme.colors.element_dark_inactive,
  },
});
