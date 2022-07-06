import {
  TextInput as Input,
  StyleSheet,
  ViewStyle,
  View,
  Text,
  Animated,
  Easing,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { theme, textStyles } from "../../theme";

interface TextInput {
  label: string;
  style?: ViewStyle;
  onChangeText?: (v: string) => void;
  secureTextEntry?: boolean;
}

export const TextInput = ({
  style,
  label,
  onChangeText,
  secureTextEntry,
}: TextInput) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  // Track width of label to calculate accurate animation
  const [labelWidth, setLabelWidth] = useState(null);
  const handleLayout = (e: any) => {
    setLabelWidth(e.nativeEvent.layout.width);
  };

  // Prevent animate in of label when there is text
  const handleChange = (v: string) => {
    // Pass to parent
    onChangeText && onChangeText(v);

    // Internal
    if (v.length > 0) setHasText(true);
    else setHasText(false);
  };

  // Animated values
  const labelScale = useRef(new Animated.Value(1)).current;
  const labelY = useRef(new Animated.Value(0)).current;
  const labelX = useRef(new Animated.Value(0)).current;

  // Animate functions
  const labelAnimateOut = (instant?: boolean) => {
    if (typeof labelWidth === "number") {
      Animated.timing(labelY, {
        toValue: -12,
        duration: instant ? 0 : 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(labelX, {
        toValue: (-labelWidth * 0.2) / 2,
        duration: instant ? 0 : 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(labelScale, {
        toValue: 0.8,
        duration: instant ? 0 : 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };
  const labelAnimateIn = (instant?: boolean) => {
    if (labelWidth) {
      Animated.timing(labelY, {
        toValue: 0,
        duration: instant ? 0 : 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(labelX, {
        toValue: 0,
        duration: instant ? 0 : 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(labelScale, {
        toValue: 1,
        duration: instant ? 0 : 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  // Trigger animations
  useEffect(() => {
    if (isFocused) labelAnimateOut();
    if (!isFocused && !hasText) labelAnimateIn();
  }, [isFocused]);

  return (
    <View
      style={[
        styles.focusContainer,
        {
          backgroundColor: isFocused
            ? theme.colors.effect_focus
            : "transparent",
        },
        style,
      ]}
    >
      <View
        style={[
          styles.container,
          {
            borderColor: isFocused
              ? theme.colors.effect_highlight
              : theme.colors.element_dark_inactive,
          },
        ]}
      >
        <Input
          secureTextEntry={secureTextEntry}
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onChangeText={(v) => handleChange(v)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
        />
        <Animated.View
          style={[
            styles.labelWrapper,
            {
              transform: [
                { translateY: labelY },
                { translateX: labelX },
                { scale: labelScale },
              ],
            },
          ]}
          onLayout={handleLayout}
          pointerEvents="none"
        >
          <Text style={styles.label}>{label}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  focusContainer: {
    borderRadius: theme.borderRadius.regular / 0.78,
    padding: 4,
    margin: -4,
  },
  container: {
    height: 57,
    borderRadius: theme.borderRadius.regular,
    borderWidth: 1,
    backgroundColor: theme.colors.bg_main,
  },
  labelWrapper: {
    position: "absolute",
    left: theme.spacing.md,
    top: 18,
  },
  label: {
    color: theme.colors.text_primary_dark_placeholder,
    fontSize: theme.fontSizes.reg,
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: theme.spacing.md,
    paddingTop: 18,
    fontSize: theme.fontSizes.reg,
    borderRadius: theme.borderRadius.regular,

    // Reset
    borderWidth: 0,
  },
});
