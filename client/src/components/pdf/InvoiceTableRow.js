import React, { Fragment } from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 100,
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "40%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  image: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row}>
      <Image style={styles.image} src={item.image} />
      <Text style={styles.description}>
        {item.name} x {item.quantity}
      </Text>
      <Text style={styles.qty}>{item.price}</Text>
      <Text style={styles.amount}>
        {(item.quantity * item.price).toFixed(2)}
      </Text>
    </View>
  ));
  return <>{rows}</>;
};

export default InvoiceTableRow;
