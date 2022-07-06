import { Platform, Linking } from "react-native";

export const openMapsWithAddress = (address: string) => {
  const url = Platform.select({
    ios: `maps:0,0?q=${address}`,
    android: `geo:0,0?q=${address}`,
  });
  if (!url) return console.log("No maps path for this os.");

  Linking.openURL(url);
};
