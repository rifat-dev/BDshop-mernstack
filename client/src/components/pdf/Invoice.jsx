import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

import InvoiceTitle from "./InvoiceTitle";
import InvoiceNo from "./InvoiceNo";
import BillTo from "./BillTo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";

const invoice = {
  id: "5df3180a09ea16dc4b95f910",
  invoice_no: "201906-28",
  balance: "$2,283.74",
  company: "MANTRIX",
  email: "susanafuentes@mantrix.com",
  phone: "+1 (872) 588-3809",
  address: "922 Campus Road, Drytown, Wisconsin, 1986",
  trans_date: "2019-09-12",
  due_date: "2019-10-12",
  items: [
    {
      sno: 1,
      desc: "ad sunt culpa occaecat qui",
      qty: 5,
      rate: 405.89,
    },
    {
      sno: 2,
      desc: "cillum quis sunt qui aute",
      qty: 5,
      rate: 373.11,
    },
    {
      sno: 3,
      desc: "ea commodo labore culpa irure",
      qty: 5,
      rate: 458.61,
    },
    {
      sno: 4,
      desc: "nisi consequat et adipisicing dolor",
      qty: 10,
      rate: 725.24,
    },
    {
      sno: 5,
      desc: "proident cillum anim elit esse",
      qty: 4,
      rate: 141.02,
    },
  ],
};

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 150,
    height: 130,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    textAlign: "center",
    width: 180,
    height: 140,
    marginLeft: "auto",
  },
});

// Create Document Component
const Invoice = ({ images, order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={images} />
        <InvoiceTitle title="Invoice" />
        <InvoiceNo invoice={order} />
        <BillTo shippingInfo={order.shippingInfo} />
        <InvoiceItemsTable invoice={order} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
};

export default Invoice;
