import { useCallback, useEffect, useRef } from "react";
import { AppState } from "react-native";

export const useAppIsActive = (callback: Function) => {
  const appStateRef = useRef(AppState.currentState);
  const handleAppStateChange = useCallback((nextAppState) => {
    if (
      appStateRef.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      callback();
    }

    appStateRef.current = nextAppState;
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
      // AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);
};
