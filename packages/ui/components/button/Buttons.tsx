import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { theme } from "../../theme";

type ButtonType = {
  label?: string;
  size?: "large" | "small";
  type?: "primary" | "secondary" | "error";
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: any;
  loading?: boolean;
  onPress?: () => void;
};

export const Button = ({
  label = "Placeholder",
  type = "primary",
  style,
  textStyle,
  size = "large",
  icon,
  loading,
  onPress,
}: ButtonType) => {
  if (type === "secondary") {
    return (
      <TouchableOpacity
        style={[secondaryStyles.container, sizeStyles[size], style]}
        onPress={onPress}
      >
        {!loading ? (
          <>
            {icon && icon}
            <Text
              style={[
                secondaryStyles.label,
                { marginLeft: icon ? theme.spacing.xs : 0, ...textStyle },
              ]}
            >
              {label}
            </Text>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
    );
  } else if (type === "primary") {
    return (
      <TouchableOpacity
        style={[primaryStyles.container, sizeStyles[size], style]}
        onPress={onPress}
      >
        {!loading ? (
          <>
            {icon && icon}
            <Text
              style={[
                primaryStyles.label,
                { marginLeft: icon ? theme.spacing.xs : 0, ...textStyle },
              ]}
            >
              {label}
            </Text>
          </>
        ) : (
          <ActivityIndicator color={theme.colors.text_primary_light} />
        )}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[errorStyles.container, sizeStyles[size], style]}
        onPress={onPress}
      >
        {!loading ? (
          <>
            {icon && icon}
            <Text
              style={[
                errorStyles.label,
                { marginLeft: icon ? theme.spacing.xs : 0, ...textStyle },
              ]}
            >
              {label}
            </Text>
          </>
        ) : (
          <ActivityIndicator color={theme.colors.text_error} />
        )}
      </TouchableOpacity>
    );
  }
};

const primaryStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.button_primary_bg,
    borderRadius: theme.borderRadius.regular,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 17,
    color: theme.colors.text_primary_light,
    fontWeight: "600",
  },
  icon: { marginRight: theme.spacing.xs },
});

const secondaryStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.button_secondary_bg,
    borderRadius: theme.borderRadius.regular,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 17,
    color: theme.colors.text_primary_dark,
    fontWeight: "600",
  },
});

const errorStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg_error,
    borderRadius: theme.borderRadius.regular,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 17,
    color: theme.colors.text_error,
    fontWeight: "600",
  },
});

const sizeStyles = StyleSheet.create({
  large: {
    padding: 23,
  },
  small: {
    paddingVertical: 15,
    paddingHorizontal: 0,
    width: 150,
  },
});
