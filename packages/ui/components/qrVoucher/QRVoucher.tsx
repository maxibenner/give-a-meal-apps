import { MaterialIcons } from "@expo/vector-icons";
import { openMapsWithAddress } from "give-a-meal-sdk";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View, ViewStyle } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { textStyles, theme } from "../../theme";
import { Button } from "../button/Buttons";

const windowHeight = Dimensions.get("window").height;

export const QRVoucher = ({
  title,
  updatedAt,
  donationId,
  businessName,
  address,
  fullAddress,
  onCancel,
  style,
}: {
  title: string;
  updatedAt: number;
  donationId: number;
  businessName: string;
  address: string;
  fullAddress: string;
  onCancel?: () => void;
  style?: ViewStyle;
}) => {
  const [qrContainerXY, setQRContainerXY] = useState({ width: 0, height: 0 });

  const payload = JSON.stringify({
    item_title: title,
    donation_id: donationId,
  });

  function getFormattetExpireTime(timestamp: number, delayInSeconds: number) {
    const expiryDate = new Date(
      new Date(timestamp).getTime() + delayInSeconds * 1000
    );

    const localeString = expiryDate.toLocaleTimeString();
    const daytime = localeString.split(" ")[1];
    const numbers = localeString.split(":");
    return `${numbers[0]}:${numbers[1]} ${daytime || ""}`;
  }

  return (
    <View style={[styles.container, style]}>
      {/* <TouchableOpacity
        style={styles.cancelButton}
        onPress={onCancel && onCancel}
      >
        <Ionicons name="close" size={22} color="black" />
      </TouchableOpacity> */}
      <View style={styles.expiryCounter}>
        <Text style={styles.counterText}>{`Expires at ${getFormattetExpireTime(
          updatedAt,
          3600
        )}`}</Text>
      </View>
      <View
        style={styles.QRContainer}
        onLayout={(event) => {
          var { width, height } = event.nativeEvent.layout;
          setQRContainerXY({ width, height });
        }}
      >
        {qrContainerXY && <QRCode size={windowHeight / 5} value={payload} />}
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.iconTextContainer}>
          <MaterialIcons
            name="storefront"
            size={17}
            color={theme.colors.text_primary_light}
          />
          <Text numberOfLines={1} style={styles.subText}>
            {businessName}
          </Text>
        </View>
        <View style={styles.iconTextContainer}>
          <MaterialIcons
            name="location-pin"
            size={17}
            color={theme.colors.text_primary_light}
          />
          <Text numberOfLines={1} style={styles.subText}>
            {address}
          </Text>
        </View>
        <Button
          onPress={() => openMapsWithAddress(fullAddress)}
          size="small"
          style={{
            backgroundColor: "white",
            width: "100%",
            marginTop: theme.spacing.sm,
          }}
          textStyle={{ color: theme.colors.text_primary_dark }}
          label="Get directions"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.element_dark_active,
    width: "85%",
    borderRadius: theme.borderRadius.large,
    shadowRadius: 3,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  QRContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg_white,
    borderRadius: theme.borderRadius.regular,
    height: windowHeight / 5 + theme.spacing.sm * 2,
    width: windowHeight / 5 + theme.spacing.sm * 2,
    marginTop: theme.spacing.lg,
  },
  contentContainer: {
    marginTop: theme.spacing.md,
    width: "100%",
  },
  title: {
    ...textStyles.header_3,
    color: theme.colors.text_primary_light,
    marginBottom: theme.spacing.xs,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subText: {
    ...textStyles.body,
    marginLeft: theme.spacing.xxs,
    color: theme.colors.text_primary_light,
    maxWidth: "80%",
  },
  cancelButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 28,
    height: 28,
    borderRadius: 20,
    opacity: 0.15,
    backgroundColor: theme.colors.text_primary_light,
  },
  expiryCounter: {
    marginLeft: -theme.spacing.xs,
    marginRight: "auto",
    paddingHorizontal: theme.spacing.sm,
    borderRadius: 20,
    opacity: 0.6,
    backgroundColor: theme.colors.text_primary_light,
  },
  counterText: {
    fontWeight: "bold",
  },
});
