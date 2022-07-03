import "./cart.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import groupImage from "../../assets/order_seccess_people.png";
import successImage from "../../assets/order_success.png";
import orderDeliveredImage from "../../assets/orderdelivered.png";

import MyDocument from "../pdf/Pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
const OrderSuccess = () => {
  const { newOrder } = useSelector((state) => state.newOrder);

  return (
    <>
      {Object.keys(newOrder).length > 0 ? (
        <div className="order-success container-fluid">
          <div className="goback-btn">
            <button>download PDF</button>
          </div>
          <div className="order-success-info box-shadow">
            <div className="group-image">
              <img src={groupImage} alt="groupImage" />
            </div>
            <div className="thankyou">
              <img src={successImage} alt="successImage" />
              <h5>thank you</h5>
            </div>
            <p className="messege">
              Payment Is Successfully Processsed And Your Order Is On The Way
            </p>
            <p className="tid">
              Transaction ID: {newOrder.paymentInfo.transactionId}
            </p>

            <div className="order-delivered">
              <img src={orderDeliveredImage} alt="orderDeliveredImage" />
            </div>

            <div className="order_review ">
              <div className="check-heading">
                <h3>YOUR ORDER DETAILS</h3>
              </div>
              <div className="table-responsive order_table">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">PRODUCT</th>
                      <th scope="col">NAME</th>
                      <th scope="col">QUANTITY</th>
                      <th scope="col">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newOrder.items.map((item) => (
                      <tr>
                        <td>
                          <img src={item.image} alt="" className="w-50 h-50" />
                        </td>
                        <td>
                          {item.name} x {item.quantity}
                        </td>
                        <td> {item.quantity}</td>
                        <td> {item.quantity * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="3">SubTotal</th>
                      <td className="product-subtotal">
                        ৳ {newOrder.subtotal}{" "}
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="3">Shipping</th>
                      <td>৳ {newOrder.shipping}</td>
                    </tr>
                    <tr>
                      <th colSpan="3">Discount</th>
                      <td>৳ {newOrder.discount}</td>
                    </tr>
                    <tr>
                      <th colSpan="3">Total</th>
                      <td className="product-subtotal">৳ {newOrder.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="address">
              <h5>Shipping Address</h5>
              <hr />
              <p>City: {newOrder.shippingInfo.city} </p>
              <p>Address: {newOrder.shippingInfo.address}</p>
              <p>Phone: {newOrder.shippingInfo.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-center my-5">
            No order created
            <PDFDownloadLink
              document={<MyDocument images={groupImage} />}
              fileName="order-details.pdf">
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <button className="btn btn-primary">Download pdf</button>
                )
              }
            </PDFDownloadLink>
          </h3>
        </>
      )}
    </>
  );
};

export default OrderSuccess;
