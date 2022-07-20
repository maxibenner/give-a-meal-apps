import { Ionicons } from "@expo/vector-icons";
import { LocationProvider } from "give-a-meal-sdk";
import { theme } from "give-a-meal-ui/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Start from "./screens/Start";
import { RoundedScreenCorners } from "give-a-meal-ui";
import { ClaimsProvider } from "give-a-meal-sdk";
import { NetworkProvider } from "give-a-meal-sdk";
import * as SplashScreen from "expo-splash-screen";
import { SignIn } from "./screens/SignIn";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  // Cache ressources >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        // List ressources
        const images = [require("./assets/splash.png")];

        // Cache images
        const cacheImages = images.map((image) =>
          Asset.fromModule(image).downloadAsync()
        );

        // Await images
        await Promise.all(cacheImages);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NetworkProvider>
      <RoundedScreenCorners>
        <SafeAreaProvider>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <NavigationContainer>
              <StatusBar style="dark" />
              <Stack.Navigator
                initialRouteName="Start"
                screenOptions={{
                  headerShadowVisible: false,
                  headerTitleStyle: {
                    color: theme.colors.bg_main,
                  },
                  headerStyle: {
                    backgroundColor: "transparent",
                  },
                  headerTintColor: theme.colors.text_link,
                }}
              >
                <Stack.Screen
                  name="Start"
                  options={{
                    headerShown: false,
                    headerTintColor: "transparent",
                  }}
                  component={Start}
                />
                <Stack.Screen
                  name="SignIn"
                  options={{
                    headerTransparent: Platform.OS === "ios" ? true : false,
                    headerBackTitle: "Back",
                  }}
                  component={SignIn}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </SafeAreaProvider>
      </RoundedScreenCorners>
    </NetworkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.bg_main,
  },
});
