import "./cart.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import groupImage from "../../assets/order_seccess_people.png";
import successImage from "../../assets/order_success.png";
import orderDeliveredImage from "../../assets/orderdelivered.png";

import Invoice from "../pdf/Invoice";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const OrderSuccess = () => {
  const [order, setOrder] = useState(() => {
    try {
      let data = localStorage.getItem("order-success")
        ? JSON.parse(localStorage.getItem("order-success"))
        : {};
      return data;
    } catch (e) {
      console.log(e);
    }
  });
  const { newOrder } = useSelector((state) => state.newOrder);

  console.log(order);
  useEffect(() => {
    localStorage.setItem("order-success", JSON.stringify(newOrder));
    setOrder(newOrder);
  }, [newOrder]);

  return (
    <>
      {Object.keys(order).length > 0 ? (
        <div className="order-success container-fluid">
          <div className="goback-btn">
            <PDFDownloadLink
              document={<Invoice images={groupImage} order={order} />}
              fileName="order-details.pdf">
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <button>Download as pdf</button>
                )
              }
            </PDFDownloadLink>
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
              Transaction ID: {order.paymentInfo.transactionId}
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
                    {order.items.map((item) => (
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
                      <td className="product-subtotal">৳ {order.subtotal} </td>
                    </tr>
                    <tr>
                      <th colSpan="3">Shipping</th>
                      <td>৳ {order.shipping}</td>
                    </tr>
                    <tr>
                      <th colSpan="3">Discount</th>
                      <td>৳ {order.discount}</td>
                    </tr>
                    <tr>
                      <th colSpan="3">Total</th>
                      <td className="product-subtotal">৳ {order.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="address">
              <h5>Shipping Address</h5>
              <hr />
              <p>City: {order.shippingInfo.city} </p>
              <p>Address: {order.shippingInfo.address}</p>
              <p>Phone: {order.shippingInfo.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-center my-5">No order created</h3>
        </>
      )}
    </>
  );
};

export default OrderSuccess;
