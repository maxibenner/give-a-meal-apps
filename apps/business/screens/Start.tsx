import { Button } from "give-a-meal-ui";
import { textStyles, theme } from "give-a-meal-ui/theme";
import React, { useState } from "react";
import { startCarousel } from "../data/startCarousel";
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Carousel } from "give-a-meal-ui";

const Start = ({ navigation }: { navigation: any }) => {
  // Navigates to main content and removes navigation stack to prevent users from returning to this screen
  // const goToMain = () => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "MainTabs" }],
  //   });
  // };

  // Mounting animation
  const animatedOpacityText = React.useRef(new Animated.Value(0)).current;
  const animatedOpacityButton = React.useRef(new Animated.Value(0)).current;
  const animatedYText = React.useRef(new Animated.Value(20)).current;
  const animatedYButton = React.useRef(new Animated.Value(20)).current;
  React.useEffect(() => {
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
        <Animated.View
          style={{
            ...styles.carouselContainer,
            transform: [{ translateY: animatedYText }],
            opacity: animatedOpacityText,
          }}
        >
          <Carousel data={startCarousel} />
        </Animated.View>
        <Animated.View
          style={{
            ...styles.buttonContainer,
            transform: [{ translateY: animatedYButton }],
            opacity: animatedOpacityButton,
          }}
        >
          <Button
            style={{ marginBottom: theme.spacing.xs }}
            label="Get started"
            type="primary"
          />
          <Button
            type="secondary"
            label="Sign in"
            onPress={() => navigation.navigate("SignIn")}
          />
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
  carouselContainer: {
    marginBottom: theme.spacing.lg,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  title: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginRight: 6,
  },
});

export default Start;
