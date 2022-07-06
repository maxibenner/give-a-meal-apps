import { PostgrestError } from "@supabase/supabase-js";
import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { functions } from "../constants/firebase";
import { supabase } from "../constants/supabase";

/**
 * List business with donation count
 * @param {number} id Id of the business
 */
export const getAvailableDonations = async (id: number) => {
  const { data, error } = await supabase
    .from("donations_w_business")
    .select("*")
    .eq("business_id", id)
    .is("active", true)
    .is("claimed_by", null);

  if (error) return { error: error, data: null };
  return { error: null, data: data };
};

/**
 * List all businesses with donations nearby
 * @param {number} lat Latitude of user location
 * @param {number} lon Longitued of user location
 * @param {number} radius Search radius in miles
 */
export const listNearbyBusinessesWithDonations = async ({
  lat,
  lon,
  radius,
}: {
  lat: number;
  lon: number;
  radius: number;
}): Promise<{ error: PostgrestError | null; data: BusinessType[] | [] }> => {
  // Get donations
  let { data, error } = await supabase.rpc("get_nearby_donations", {
    latitude: lat,
    longitude: lon,
    radius: radius,
  });

  // Check response
  if (error) return { error: error, data: null };
  else {
    // Return sorted businesses
    return { error: null, data: groupDonationsByBusiness(data) };
  }
};

/**
 * Subscribe to donations
 * @param {string} claimId Id to identify claims of user
 * @param {(DonationType[]) => void} callback Runs on update, receives updated data
 */
export const subscribeToDonations = (
  claimId: string,
  callback: (data: DonationType[]) => void
) => {
  // Initial data fetch
  listClaimedDonations(claimId).then(
    ({ data, error }) => data && callback(data)
  );

  // Fetch on update
  const subId = supabase
    .from("donations")
    .on("UPDATE", () => {
      listClaimedDonations(claimId).then(
        ({ data, error }) => data && callback(data)
      );
    })
    .subscribe();

  return () => {
    supabase.removeSubscription(subId);
  };
};

/**
 * List all donations claimed by user with claimId
 * @param donationId Donation id
 * @param claimId Id to identify claim (needs to be saved locally by user)
 */
export const claimDonation = async ({
  donationId,
  claimId,
}: {
  donationId: number;
  claimId: string;
}) => {
  const response = (await httpsCallable<{
    donationId: number;
    storageId: string;
  }>(
    functions,
    "claimDonation"
  )({
    donationId: donationId,
    storageId: claimId,
  })) as HttpsCallableResult<{
    data: { message: string; details: string; hint: string; code: number };
    error: PostgrestError | null;
  }>;

  if (!response.data.error) {
    return {
      message: "Success",
      details: "Successfully claimed donation.",
      hint: "",
      code: 200,
    };
  } else {
    return response.data.error;
  }
};

/**
 * List all donations claimed by user with claimId
 * @param claimId Id that has been used to claim the donations
 */
export const listClaimedDonations = async (claimId: string) => {
  const res = await supabase
    .from("donations")
    .select("*, item_id (*, business_id(*))")
    .eq("claimed_by", claimId)
    .eq("active", true);

  return { data: res.data, error: res.error };
};

const groupDonationsByBusiness = (data: QueryResponse[]) => {
  let businesses: BusinessType[] = [];

  for (let i_data = 0; i_data < data.length; i_data++) {
    // Create donation object
    const newDonation = {
      donation_id: data[i_data].id,
      description: data[i_data].description,
      title: data[i_data].title,
      active: data[i_data].active,
      claimed_by: data[i_data].claimed_by,
      donor_name: data[i_data].donor_name,
      updated_at: data[i_data].updated_at,
    };

    // If businesses array contains businesses
    if (businesses.length !== 0) {
      // Loop through businesses
      for (
        let i_businesses = 0;
        i_businesses < businesses.length;
        i_businesses++
      ) {
        // Check if business already exists in array
        if (businesses[i_businesses].business_id === data[i_data].business_id) {
          // Push new donation to existing business
          businesses[i_businesses].donations.push(newDonation);
          break;
        } else {
          // Create new business object with donation
          if (i_businesses + 1 === businesses.length) {
            const newBusiness = {
              business_id: data[i_data].business_id,
              business_name: data[i_data].business_name,
              address: data[i_data].address,
              city: data[i_data].city,
              country: data[i_data].country,
              distance: data[i_data].distance,
              lat: data[i_data].lat,
              lon: data[i_data].lon,
              postal_code: data[i_data].postal_code,
              state: data[i_data].state,
              donations: [newDonation],
            };
            businesses.push(newBusiness);
            break;
          }
        }
      }
    } else {
      // Create new business object with donation
      const newBusiness = {
        business_id: data[i_data].business_id,
        business_name: data[i_data].business_name,
        address: data[i_data].address,
        city: data[i_data].city,
        country: data[i_data].country,
        distance: data[i_data].distance,
        lat: data[i_data].lat,
        lon: data[i_data].lon,
        postal_code: data[i_data].postal_code,
        state: data[i_data].state,
        donations: [newDonation],
      };
      businesses.push(newBusiness);
    }
  }

  return businesses;
};

type QueryResponse = {
  active: boolean;
  address: string;
  business_id: number;
  business_name: string;
  city: string;
  claimed_by: string | null;
  country: string;
  description: string;
  distance: number;
  donor_name: string;
  id: number;
  lat: number;
  lon: number;
  postal_code: number;
  state: string;
  title: string;
  updated_at: string;
};

export type BusinessType = {
  business_id: number;
  business_name: string;
  address: string;
  city: string;
  country: string;
  distance: number;
  lat: number;
  lon: number;
  postal_code: number;
  state: string;
  donations: DonationType[];
};
export type DonationType = {
  donation_id: number;
  description: string;
  title: string;
  active: boolean;
  claimed_by: string | null;
  donor_name: string;
  updated_at: string;
};
