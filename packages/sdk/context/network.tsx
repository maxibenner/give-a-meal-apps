import NetInfo from "@react-native-community/netinfo";
import React, { createContext, ReactNode, useState, useEffect } from "react";

export const NetworkContext = createContext<{ network: boolean }>(null);
export function NetworkProvider({ children }: { children: ReactNode }) {
  const [network, setNetwork] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setNetwork(state.isConnected);
      // setNetwork(false);
    });
  }, []);

  return (
    <NetworkContext.Provider value={{ network }}>
      {children}
    </NetworkContext.Provider>
  );
}
