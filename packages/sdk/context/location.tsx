import { useAppIsActive } from "../hooks/useAppIsActive";
import * as Location from "expo-location";
import { Linking, Platform } from "react-native";
import { LocationObject } from "expo-location";
import React, { createContext, ReactNode, useState, useEffect } from "react";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";

// Context ---------  Context ---------  Context ---------  Context ---------
export const LocationContext = createContext<LocationContextType>({
  location: null,
  locationStatus: "pending",
  requestLocation: () => null,
});
export type LocationContextType = {
  location: any | null;
  locationStatus: "pending" | "available" | "unavailable" | "declined";
  requestLocation: (force?: boolean) => void;
};

// Provider ---------  Provider ---------  Provider ---------  Provider ---------
export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    "pending" | "available" | "unavailable" | "declined"
  >("pending");

  async function requestLocation(force?: boolean) {
    let permission = await Location.getForegroundPermissionsAsync();

    // -> Permission granted
    if (permission.granted) {
      getLocation();
    }

    // -> Permission not granted but CAN ask again
    if (!permission.granted && permission.canAskAgain) {
      let { status } = await Location.requestForegroundPermissionsAsync();

      // Declined by user
      if (status !== "granted") setLocationStatus("declined");
      // Granted by user
      else getLocation();
    }

    // -> Permission not granted and CAN NOT ask again
    if (!permission.granted && !permission.canAskAgain) {
      if (force) {
        // Open settings
        if (Platform.OS === "ios") {
          Linking.openURL("app-settings:");
        }
        if (Platform.OS === "android") {
          startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
        }
      } else setLocationStatus("declined");
    }
  }

  // Handle location with states
  const getLocation = async () => {
    let location = await Location.getLastKnownPositionAsync({});
    if (location) {
      setLocationStatus("available");
      setLocation(location);
    } else {
      setLocationStatus("unavailable");
    }
  };

  // Request permission again if coming back from settings
  useAppIsActive(() => {
    console.log("Back from background");
    requestLocation();
  });

  return (
    <LocationContext.Provider
      value={{ location, locationStatus, requestLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
}
