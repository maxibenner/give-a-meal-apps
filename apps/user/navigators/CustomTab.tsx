import { Button } from "give-a-meal-ui";
import { effects, theme } from "give-a-meal-ui/theme";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

interface MyTabBar {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: any;
}

function MyTabBar({ state, descriptors, navigation }: MyTabBar) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.bar, { paddingBottom: theme.spacing.md + insets.bottom }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const icon = options.tabBarIcon({ focused: isFocused });

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <Button
            key={label}
            type={isFocused ? "primary" : "secondary"}
            label={label}
            style={{
              flex: 1,
              marginHorizontal: flexGap / 2,
              backgroundColor: isFocused
                ? theme.colors.text_link
                : theme.colors.bg_main,
            }}
            icon={icon}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

// Set to imitate flex gap
const flexGap = 8;

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopLeftRadius: theme.borderRadius.regular,
    borderTopRightRadius: theme.borderRadius.regular,
    padding: theme.spacing.md,
    paddingHorizontal: theme.spacing.md - flexGap / 2,
    backgroundColor: theme.colors.bg_white,
    ...effects.shadow,
  },
});

export default MyTabBar;
