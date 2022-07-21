import React, { createContext, ReactNode, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { DonationType } from "../functions/donations";
import { listClaimedDonations } from "../functions/donations";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import "react-native-url-polyfill/auto";

// Context ---------  Context ---------  Context ---------  Context ---------
export const ClaimsContext = createContext<{
  claimId: string | null;
  claimedDonations: DonationType[] | [] | null;
  refreshClaimedDonations: () => void;
  setClaimedDonationsDirectly: (claimedDonations: DonationType[]) => void;
}>(null);

// Provider ---------  Provider ---------  Provider ---------  Provider ---------
export function ClaimsProvider({ children }: { children: ReactNode }) {
  const [claimId, setClaimId] = useState<string | null>(null);
  const [claimedDonations, setClaimedDonations] = useState<DonationType[] | []>(
    []
  );

  useEffect(() => {
    initId();
  }, []);

  useEffect(() => {
    if (claimId) refreshClaimedDonations();
  }, [claimId]);

  const initId = async () => {
    try {
      const value = await AsyncStorage.getItem("CLAIM_ID");
      if (value) {
        setClaimId(value);
      } else {
        const id = uuid.v4() as string;
        await AsyncStorage.setItem("CLAIM_ID", id);
        setClaimId(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshClaimedDonations = async () => {
    if (claimId) {
      const { data, error } = await listClaimedDonations(claimId);
      if (data) setClaimedDonations(data);

      return;
    }
  };

  const setClaimedDonationsDirectly = (data: DonationType[]) => {
    setClaimedDonations(data);
  };

  return (
    <ClaimsContext.Provider
      value={{
        claimId,
        claimedDonations,
        setClaimedDonationsDirectly,
        refreshClaimedDonations,
      }}
    >
      {children}
    </ClaimsContext.Provider>
  );
}
