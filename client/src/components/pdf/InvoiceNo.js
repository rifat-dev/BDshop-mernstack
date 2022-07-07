import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    // width: 60,
  },
});

const InvoiceNo = ({ invoice }) => (
  <Fragment>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>User Id : </Text>
      <Text style={styles.invoiceDate}>{invoice.user}</Text>
    </View>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Transaction Id : </Text>
      <Text style={styles.invoiceDate}>
        {invoice.paymentInfo.transactionId}
      </Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text>{new Date(invoice.paymentInfo.paidAt).toLocaleDateString()}</Text>
    </View>
  </Fragment>
);

export default InvoiceNo;
