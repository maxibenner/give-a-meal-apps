import { Button } from "give-a-meal-ui";
import { textStyles, theme } from "give-a-meal-ui/theme";
import React from "react";
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

const Start = ({ navigation }: { navigation: any }) => {
  // Navigates to main content and removes navigation stack to prevent users from returning to this screen
  const goToMain = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };

  // Mounting animation
  const animatedOpacityText = React.useRef(new Animated.Value(0)).current;
  const animatedOpacityButton = React.useRef(new Animated.Value(0)).current;
  const animatedYText = React.useRef(new Animated.Value(20)).current;
  const animatedYButton = React.useRef(new Animated.Value(20)).current;
  React.useEffect(() => {
    alert(JSON.stringify({ message: "trest", lala: "tset2" }));
    Animated.stagger(150, [
      Animated.spring(animatedOpacityText, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(animatedOpacityButton, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.stagger(150, [
      Animated.spring(animatedYText, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(animatedYButton, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.imageBg}
      source={require("../assets/splash.png")}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <Animated.View style={styles.inner}>
          <Animated.View
            style={{
              transform: [{ translateY: animatedYText }],
              opacity: animatedOpacityText,
            }}
          >
            <Text style={styles.title}>Give a Meal</Text>
            <Text
              style={[
                textStyles.header_2,
                {
                  marginBottom: theme.spacing.sm,
                },
              ]}
            >
              Pick up free meals donated by your community
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ translateY: animatedYButton }],
              opacity: animatedOpacityButton,
            }}
          >
            <Button
              style={{ marginBottom: theme.spacing.sm }}
              type="primary"
              label="Find meals"
              onPress={goToMain}
            />
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    backgroundColor: theme.colors.bg_brand,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    maxHeight: "65%",
  },
  title: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginRight: 6,
  },
});

export default Start;
