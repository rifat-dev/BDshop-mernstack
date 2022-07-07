import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const BillTo = ({ shippingInfo }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.billTo}>shipping To:</Text>
      <Text>City : {shippingInfo.city}</Text>
      <Text>Address : {shippingInfo.address}</Text>
      <Text>Phone : {shippingInfo.phone}</Text>
    </View>
  );
};

export default BillTo;
