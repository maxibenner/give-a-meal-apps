import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { textStyles, theme } from "../../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";

export type Item = {
  title: string;
  info: string;
  type: "donation_added" | "donation_redeemed" | "team_request";
  id: string;
  style?: ViewStyle;
};

export const Item = ({ title, info, type, style }: Item) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        <View style={styles.iconBg}>{getIcon(type)}</View>
        <View>
          <Text style={textStyles.label_button}>{title}</Text>
          <Text style={textStyles.body_sub}>{info}</Text>
        </View>
      </View>

      <View style={styles.arrowIcon}>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={theme.colors.text_primary_dark_placeholder}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg_white,
    borderRadius: theme.borderRadius.regular,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.element_dark_active,
    marginRight: theme.spacing.md,
  },
  arrowIcon: {},
});

function getIcon(
  type: "donation_added" | "donation_redeemed" | "team_request"
) {
  switch (type) {
    case "donation_added":
      return (
        <Feather
          name="plus"
          size={20}
          color={theme.colors.text_primary_light}
        />
      );
    case "donation_redeemed":
      return (
        <Ionicons
          name="ios-checkmark-sharp"
          size={20}
          color={theme.colors.text_primary_light}
        />
      );
    case "team_request":
      return (
        <Ionicons
          name="person"
          size={14}
          color={theme.colors.text_primary_light}
        />
      );
  }
}
