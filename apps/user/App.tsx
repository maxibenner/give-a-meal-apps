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
import MyTabBar from "./navigators/CustomTab";
import DonationDetails from "./screens/DonationDetails";
import Reserved from "./screens/Reserved";
import Restaurant from "./screens/Restaurant";
import Search from "./screens/Search";
import Start from "./screens/Start";
import { RoundedScreenCorners } from "give-a-meal-ui";
import { ClaimsProvider } from "give-a-meal-sdk";
import { NetworkProvider } from "give-a-meal-sdk";
import * as SplashScreen from "expo-splash-screen";

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
        const images = [
          require("./assets/splash.png"),
          require("./assets/donation_placeholder.png"),
        ];

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
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Rendering >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NetworkProvider>
        <ClaimsProvider>
          <LocationProvider>
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
                        options={{
                          headerShown: false,
                          headerTintColor: "transparent",
                        }}
                        name="MainTabs"
                        component={MainTabs}
                      />
                      <Stack.Screen
                        options={{
                          headerTransparent:
                            Platform.OS === "ios" ? true : false,
                          headerBackTitle: "Back",
                        }}
                        name="Restaurant"
                        component={Restaurant}
                      />
                      <Stack.Screen
                        options={{
                          headerTransparent:
                            Platform.OS === "ios" ? true : false,
                          headerBackTitle: "Back",
                        }}
                        name="Donation Details"
                        component={DonationDetails}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </View>
              </SafeAreaProvider>
            </RoundedScreenCorners>
          </LocationProvider>
        </ClaimsProvider>
      </NetworkProvider>
    </GestureHandlerRootView>
  );
}

const MainTabs = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="search"
              size={18}
              color={
                focused
                  ? theme.colors.text_primary_light
                  : theme.colors.text_primary_dark
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reserved"
        component={Reserved}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="star"
              size={18}
              color={
                focused
                  ? theme.colors.text_primary_light
                  : theme.colors.text_primary_dark
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.bg_main,
  },
});
