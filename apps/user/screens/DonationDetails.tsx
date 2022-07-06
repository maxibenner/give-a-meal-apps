import { Button, BottomSheet } from "give-a-meal-ui";
import { textStyles, theme } from "give-a-meal-ui/theme";
import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
} from "react-native";
import { claimDonation } from "give-a-meal-sdk";
import { ClaimsContext } from "give-a-meal-sdk";
import { NetworkContext } from "give-a-meal-sdk";

export const DonationDetails = ({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) => {
  const { title, description, donatedBy, donationId } = route.params;
  const { claimId } = useContext(ClaimsContext);
  const { network } = useContext(NetworkContext);

  // Modals
  const [isConfirming, setIsConfirming] = useState(false);
  const [isReserving, setIsReserving] = useState(false);

  function createErrorAlert(title: string, msg: string) {
    Alert.alert(title, msg, [
      {
        text: "Go back",
        onPress: () => navigation.navigate("Search"),
        style: "cancel",
      },
    ]);
  }

  async function confirmReservation() {
    setIsReserving(true);
    if (!claimId) return;
    const res = await claimDonation({
      donationId: donationId,
      claimId: claimId,
    });
    setIsReserving(false);
    setIsConfirming(false);

    if (res.code === 200) {
      setTimeout(() => navigation.navigate("Reserved"), 300);
    } else {
      createErrorAlert(res.message, res.details);
    }
  }

  function openModal() {
    if (network) setIsConfirming(true);
    else
      createErrorAlert(
        "No internet",
        "You are not connected to the internet. Please try again, later."
      );
  }

  return (
    <>
      {/* Page */}
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.inner}>
          <View>
            <Text style={styles.donationTitle}>{title}</Text>
            <Text style={styles.subCategory}>Description</Text>
            <Text style={styles.body}>
              {description ? description : "No description"}
            </Text>
            <Text style={styles.subCategory}>Donated by</Text>
            <Text style={styles.body}>
              {donatedBy ? donatedBy : "No donor name"}
            </Text>
          </View>
          <Button
            style={{ backgroundColor: theme.colors.text_link }}
            label="Claim this meal"
            onPress={() => openModal()}
          />
        </View>
      </SafeAreaView>

      {/* Confirmation modal */}
      <BottomSheet
        title="Are you sure?"
        active={isConfirming}
        block={isReserving}
        onCloseRequest={() => setIsConfirming(false)}
      >
        <View>
          <Text style={[textStyles.body, { marginBottom: theme.spacing.md }]}>
            Claiming this meal will reserve it for 1 hour. You can reserve a
            maximum of 3 meals at the same time.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => !isReserving && confirmReservation()}
              loading={isReserving}
              style={{
                flex: 1,
                marginRight: 4,
                backgroundColor: theme.colors.text_link,
              }}
              label="Claim"
            />
            <Button
              onPress={() => !isReserving && setIsConfirming(false)}
              style={{ flex: 1, marginLeft: 4 }}
              type="secondary"
              label="Cancel"
            />
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default DonationDetails;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.bg_main,
  },
  inner: {
    flex: 1,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.lg,
  },
  title: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginRight: 6,
  },
  donationTitle: {
    ...textStyles.header_3,
    marginTop: Platform.OS === "ios" ? theme.spacing.lg : theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  subCategory: {
    ...textStyles.label_button,
    marginBottom: theme.spacing.xxs,
  },
  body: {
    ...textStyles.body,
    color: theme.colors.text_primary_dark_60,
    marginBottom: theme.spacing.md,
  },
  // Modal
  buttonContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
