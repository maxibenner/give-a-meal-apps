import { Image, View, ViewProps } from "react-native";
import Pin from "../../assets/pin.png";
import Ruler from "../../assets/ruler.png";
import React from "react";

export const Icon = ({
  name,
  size = 17,
  style,
}: {
  name: "ruler" | "pin";
  size?: number;
  style?: ViewProps;
}) => {
  return (
    <View style={style}>
      {name === "ruler" && (
        <Image style={{ width: size, height: size }} source={Pin} />
      )}
      {name === "pin" && (
        <Image style={{ width: size, height: size }} source={Ruler} />
      )}
    </View>
  );
};
