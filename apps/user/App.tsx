import { Ionicons } from "@expo/vector-icons";
import { LocationProvider } from "give-a-meal-sdk";
import { theme } from "give-a-meal-ui/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  // Cache ressources >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [isLoaded, setIsLoaded] = React.useState(false);

  let cacheRessources = async () => {
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
    return Promise.all(cacheImages);
  };

  React.useEffect(() => {
    cacheRessources().then(() => setIsLoaded(true));
  }, []);

  // Rendering >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NetworkProvider>
        <ClaimsProvider>
          <LocationProvider>
            <RoundedScreenCorners>
              <SafeAreaProvider>
                <View style={styles.container}>
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
