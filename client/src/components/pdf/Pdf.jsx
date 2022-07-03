import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  image: {
    textAlign: "center",
    width: 100,
    height: 100,
    marginLeft: "auto",
  },
});

// Create Document Component
const MyDocument = ({ images }) => {
  return (
    <Document title="BDShop order details">
      <Page size="A4" style={styles.page} warp>
        <Image style={styles.image} src={images} />
      </Page>
    </Document>
  );
};

export default MyDocument;
