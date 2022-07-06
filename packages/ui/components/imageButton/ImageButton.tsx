import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { textStyles, theme } from "../../theme";

export const ImageButton = ({
  label,
  imgSrc,
  backgroundColor = theme.colors.bg_white,
  imgHeight = 80,
  style,
}: {
  label: string;
  imgSrc: any;
  backgroundColor?: string;
  imgHeight?: number;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.wrapper, style]}>
      <View style={[styles.imageBG, { backgroundColor: backgroundColor }]}>
        <Image
          source={imgSrc}
          resizeMode="contain"
          style={{ height: imgHeight }}
        />
      </View>
      <View style={styles.button}>
        <Text
          style={[
            textStyles.label_button,
            { color: theme.colors.text_primary_light },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: "hidden",
    borderRadius: theme.borderRadius.regular,
  },
  imageBG: {
    height: 124,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.button_primary_bg,
  },
});
