import { Text, StyleSheet, View, ViewStyle } from "react-native";
import { textStyles, theme } from "../../theme";

export const Badge = ({
  label,
  style,
}: {
  label: string;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    backgroundColor: theme.colors.element_dark_active,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
  },
  label: {
    ...textStyles.label_input_active,
    opacity: 1,
    color: theme.colors.text_primary_light,
  },
});
