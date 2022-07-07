import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    aligninvoice: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ invoice }) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>Subtotal</Text>
        <Text style={styles.total}>{invoice.subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Shipping</Text>
        <Text style={styles.total}>{invoice.shipping}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Discount</Text>
        <Text style={styles.total}>{invoice.discount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Total</Text>
        <Text style={styles.total}>{invoice.total}</Text>
      </View>
    </>
  );
};

export default InvoiceTableFooter;
