import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { textStyles, theme } from "give-a-meal-ui/theme";
import { Button, TextInput } from "give-a-meal-ui";

export const SignIn = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Text style={[textStyles.header_2, { marginBottom: theme.spacing.lg }]}>
          Sign In
        </Text>
        <TextInput style={{ marginBottom: theme.spacing.xs }} label="Email" />
        <TextInput
          style={{ marginBottom: theme.spacing.lg }}
          label="Password"
        />
        <Button label="Sign in" type="primary" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
});
