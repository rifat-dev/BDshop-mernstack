import "./profile.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMySingleOrder } from "../../store/actions/orderActions";

import groupImage from "../../assets/order_seccess_people.png";
import successImage from "../../assets/order_success.png";
import orderDeliveredImage from "../../assets/orderdelivered.png";

const OrderDetails = (props) => {
  const { orderId } = props.match.params;
  const { singleOrder } = useSelector((state) => state.singleOrderDetails);
  const dispatch = useDispatch();

  console.log(singleOrder);
  useEffect(() => {
    dispatch(getMySingleOrder(orderId));
  }, []);
  return (
    <>
      {Object.keys(singleOrder).length > 0 ? (
        <div className="order-success container-fluid">
          {/* <div className="goback-btn">
            <button>download PDF</button>
          </div> */}
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
              Transaction ID: {singleOrder.paymentInfo.transactionId}
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
                    {singleOrder.items.map((item) => (
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
                        ৳ {singleOrder.subtotal}{" "}
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="3">Shipping</th>
                      <td>৳ {singleOrder.shipping}</td>
                    </tr>
                    <tr>
                      <th colSpan="3">Discount</th>
                      <td>৳ {singleOrder.discount}</td>
                    </tr>
                    <tr>
                      <th colSpan="3">Total</th>
                      <td className="product-subtotal">
                        ৳ {singleOrder.total}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="address">
              <h5>Shipping Address</h5>
              <hr />
              <p>City: {singleOrder.shippingInfo.city} </p>
              <p>Address: {singleOrder.shippingInfo.address}</p>
              <p>Phone: {singleOrder.shippingInfo.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-center my-5">No order found</h3>
        </>
      )}
    </>
  );
};

export default OrderDetails;
