import React, { ReactNode, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { effects, textStyles, theme } from "../../theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 *
 * @param title Title to display on modal header
 * @param active Show and hide the modal
 * @param children Content do display inside of the modal
 * @param onCloseRequest Pass a function that will be called when modal is dismissed by swiping down or tapping the background
 * @param block Prevents modal to be closed from internal interaction when set to true. Might lead to problems when not blocking state change in parent.
 * @returns
 */
export const BottomSheet = ({
  active,
  onCloseRequest,
  block,
  children,
  error,
  title,
}: {
  active: boolean;
  onCloseRequest: () => void;
  block?: boolean;
  children: ReactNode;
  error?: boolean;
  title?: string;
}) => {
  // Layout
  const insets = useSafeAreaInsets();
  const [contentHeight, setContentHeight] = useState(151);

  const [visible, setVisible] = useState(false);

  // Trigger animation from parent
  useEffect(() => {
    if (active) animateIn();
    else animateOut();
  }, [active, contentHeight]);

  // Use to request state change from parent
  const requestClose = () => !block && onCloseRequest();

  const animateIn = () => {
    setVisible(true);
    translateY.value = withSpring(-contentHeight, { mass: 0.2 });
  };

  const animateOut = () => {
    if (block) return;
    translateY.value = withSpring(0, { mass: 0.2 }, () =>
      runOnJS(setVisible)(false)
    );
  };

  // Animation variables
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 }); // Keep track of previous gesture

  // ANIMATION: Trigger -> Gesture
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -contentHeight);
    })
    .onEnd(() => {
      if (translateY.value * 2 > -contentHeight) {
        if (block) {
          // Bounce back
          translateY.value = withSpring(-contentHeight, { mass: 0.2 });
        } else runOnJS(onCloseRequest)();
      } else {
        // Bounce back
        translateY.value = withSpring(-contentHeight, { mass: 0.2 });
      }
    });

  // TRANSFORM animation property
  const animatedSheetStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // OPACITY animation property
  const animatedBgOpacity = useAnimatedStyle(() => {
    "worklet";
    const percentageMoved = (-translateY.value + 1) / (contentHeight + 1); // Add + 1 to prevent dividing by 0

    // Divide to go less than 100%
    const opacitySetting = percentageMoved / 2;

    return {
      opacity: opacitySetting,
    };
  }, [translateY.value, contentHeight]);

  // Render component
  return (
    <Modal
      visible={active || visible}
      transparent
      onRequestClose={requestClose}
    >
      <Animated.View
        onTouchStart={requestClose}
        style={[styles.background, animatedBgOpacity]}
      />
      {/* <GestureDetector gesture={gesture}> */}
      <Animated.View
        style={[styles.sheet, animatedSheetStyle]}
        onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
      >
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.cancelButton} onPress={requestClose}>
            <Ionicons name="close" size={22} color="black" />
          </TouchableOpacity>
          {/* <View style={styles.handle} /> */}
          <Text style={styles.headerText}>{title || "Information"}</Text>
        </View>
        <View
          style={[
            styles.content,
            {
              marginBottom:
                Platform.OS === "ios" ? insets.bottom : theme.spacing.md,
            },
          ]}
        >
          {children}
        </View>
      </Animated.View>
      {/* </GestureDetector> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Modal styles are set automatically
  background: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "black",
  },
  sheet: {
    flex: 1,
    width: "100%",
    position: "absolute",
    top: SCREEN_HEIGHT,
    backgroundColor: theme.colors.bg_white,
    borderTopRightRadius: theme.borderRadius.regular,
    borderTopLeftRadius: theme.borderRadius.regular,
    ...effects.shadow,
  },
  headerBar: {
    height: 60,
    borderBottomColor: theme.colors.element_dark_inactive,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  handle: {
    width: 50,
    height: 4,
    backgroundColor: theme.colors.text_primary_light,
    marginBottom: 5,
    borderRadius: 2,
    position: "absolute",
    top: -12,
  },
  cancelButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 1.5,
    top: theme.spacing.sm,
    right: theme.spacing.md,
    width: 28,
    height: 28,
    borderRadius: 20,
    opacity: 0.35,
    backgroundColor: theme.colors.element_dark_inactive,
  },
  headerText: {
    ...textStyles.label_button,
  },
  content: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
});
