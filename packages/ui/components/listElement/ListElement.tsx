import { Text, View, StyleSheet } from "react-native";
import { textStyles, theme } from "../../theme";

export const ListElement = ({
  firstLine,
  secondLine,
  titleIcon,
}: {
  firstLine: string;
  secondLine: string;
  titleIcon?: any;
}) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={textStyles.label_button}>{firstLine}</Text>
        <View style={styles.iconContainer}>{titleIcon}</View>
      </View>
      <Text style={textStyles.body_sub}>{secondLine}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
  },
  iconContainer: {
    marginLeft: theme.spacing.xxs,
  },
});
