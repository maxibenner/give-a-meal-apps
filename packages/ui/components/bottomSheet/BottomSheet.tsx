import React, { ReactNode, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
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

/**
 *
 * @param title Title to display on modal header
 * @param active Show and hide the modal
 * @param children Content do display inside of the modal
 * @param onCloseRequest Pass a function that will be called when modal is dismissed by swiping down or tapping the background
 * @param block Prevents modal to be closed from internal interaction when set to true
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
  const [contentHeight, setContentHeight] = useState(0);
  const [waitForAnimation, setWaitForAnimation] = useState(false);

  // Show / hide sheet
  useEffect(() => {
    if (active) {
      // Activate to prevent closing of modal before hide animations are finished playing
      setWaitForAnimation(true);

      // Animate in
      translateY.value = withSpring(-contentHeight, { mass: 0.2 });
    } else handleCloseWithDelay();
  }, [active, contentHeight]);

  // Use this function to trigger close animation imperatively
  const handleClose = () => {
    !block && onCloseRequest();
  };

  // Use this function for declarative closing
  const handleCloseWithDelay = () => {
    // Animate
    translateY.value = withSpring(20, { mass: 0.2 }, () => {
      // Allow modal to disappear
      runOnJS(setWaitForAnimation)(false);
    });
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
      // Bottom sheet
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -contentHeight);
    })
    .onEnd(() => {
      if (translateY.value * 2 > -contentHeight) {
        // Prevent closing when blocking is active
        if (block) {
          // Animate back to full open state
          translateY.value = withSpring(-contentHeight, { mass: 0.2 });
        } else {
          // Animate bottom sheet to hidden state (20 instead of 0 to hide handle)
          translateY.value = withSpring(20, { mass: 0.2 }, () => {
            runOnJS(onCloseRequest)();
          });
        }
      } else {
        // Animate back to full open state
        translateY.value = withSpring(-contentHeight, { mass: 0.2 });
      }
    });

  // TRANSFORM animatio property
  const reanimatedSheetStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // OPACITY animation property
  const reanimatedBgStyle = useAnimatedStyle(() => {
    "worklet";
    const safeTranslateY = translateY.value + 1; // Add + 1 to prevent dividing by 0
    const safeContentHeight = contentHeight + 1; // Add + 1 to prevent dividing by 0
    const percentageMoved = -safeTranslateY / safeContentHeight;

    // Divide to go less than 100%
    const opacitySetting = percentageMoved / 2;

    return {
      opacity: opacitySetting,
    };
  }, [translateY.value, contentHeight]);

  // Render component
  return (
    <Modal
      visible={active || waitForAnimation}
      transparent
      onRequestClose={handleClose}
    >
      <Animated.View
        // Only allows close on background press when fully visible
        onTouchStart={handleClose}
        style={[styles.background, reanimatedBgStyle]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.container, reanimatedSheetStyle]}
          onLayout={(event) =>
            setContentHeight(event.nativeEvent.layout.height)
          }
        >
          <View style={styles.headerBar}>
            <View style={styles.handle} />
            <Text
              style={[
                styles.headerText,
                {
                  color: error
                    ? theme.colors.text_error
                    : theme.colors.text_primary_dark,
                },
              ]}
            >
              {title ? title : "Information"}
            </Text>
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
      </GestureDetector>
    </Modal>
  );
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "black",
  },
  container: {
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
  headerText: {
    ...textStyles.label_button,
  },
  content: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
});
