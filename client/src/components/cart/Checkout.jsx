import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Payment from "./Payment";
import { saveShippingInfo } from "../../store/actions/cartActions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Shipping = ({ history }) => {
  const [cartInfo, setCartInfo] = useState({});
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ city, address, phone }));
  };

  useEffect(() => {
    let data = sessionStorage.getItem("cartInfo")
      ? JSON.parse(sessionStorage.getItem("cartInfo"))
      : {};
    console.log(data);
    setCartInfo(data);
  }, []);

  return (
    <div className="container-fluid my-5 shipping">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="address-form box-shadow">
            <div className="check-heading">
              <h3>Shipping Information</h3>
            </div>
            <form onSubmit={submitHandler}>
              <div className="mb-3 form-group">
                <label for="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  id="city"
                  placeholder="city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
              <div className="mb-3 form-group">
                <label for="address" className="form-label">
                  Address Information
                </label>
                <textarea
                  className="form-control"
                  name="address"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  rows="3"></textarea>
              </div>
              <div className="mb-3 form-group">
                <label for="mobile" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  id="mobile"
                  placeholder="mobile"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
              <button className="shipping-btn">Save</button>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="order_review  box-shadow ">
            <div className="check-heading">
              <h3>Your Orders</h3>
            </div>
            <div className="table-responsive order_table">
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "80%" }}>
                      Product
                    </th>
                    <th
                      scope="col"
                      style={{ width: "20%", textAlign: "center" }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr>
                      <td>
                        {item.name}{" "}
                        <span className="product-qty">x {item.quantity}</span>
                      </td>
                      <td>৳ {item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>SubTotal</th>
                    <td className="product-subtotal">
                      ৳ {cartInfo && cartInfo.subtotal}
                    </td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>৳ {cartInfo && cartInfo.shipping}</td>
                  </tr>
                  <tr>
                    <th>Discount</th>
                    <td>৳ {cartInfo && cartInfo.discount}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td className="product-subtotal">
                      ৳ {cartInfo && Number(cartInfo.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="payment my-5">
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
