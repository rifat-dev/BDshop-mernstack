import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import StripeCheckout from "react-stripe-checkout";
import { saveShippingInfo } from "../../store/actions/cartActions";

import { createNewOrder, cleareError } from "../../store/actions/orderActions";
import { NEW_ORDER_CREATE_RESET } from "../../store/Types/orderTypes";
import { CLEARE_CART } from "../../store/Types/cartType";

const Shipping = ({ history }) => {
  const [cartInfo] = useState(() => {
    try {
      let data = sessionStorage.getItem("cartInfo")
        ? JSON.parse(sessionStorage.getItem("cartInfo"))
        : {};
      return data;
    } catch (e) {
      console.log(e);
      return {};
    }
  });

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { isCreated, loading, error } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ city, address, phone }));
  };

  const onToken = (token) => {
    // console.log(token);
    let newOrder = {
      token,
      items: cartItems,
      shippingInfo,
      coupon: cartInfo.applyedCoupon,
      subtotal: cartInfo.subtotal,
      shipping: cartInfo.shipping,
      discount: cartInfo.discount,
      totalAmount: cartInfo.total,
    };
    dispatch(createNewOrder(newOrder));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(cleareError());
    }

    if (isCreated) {
      alert.success("Order Created Successfully");
      dispatch({ type: NEW_ORDER_CREATE_RESET });
      dispatch({ type: CLEARE_CART });
      localStorage.removeItem("bdshop_cartItems");
      localStorage.removeItem("bdshop_shipping");
      sessionStorage.removeItem("cartInfo");
      history.push("/order-success");
    }
  }, [error, alert, dispatch, isCreated, history]);

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
                  value={shippingInfo.city && shippingInfo.city}
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
                  value={shippingInfo.address && shippingInfo.address}
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
                  value={shippingInfo.phone && shippingInfo.phone}
                />
              </div>
              <button
                className="shipping-btn"
                style={{
                  backgroundColor: `${
                    Object.keys(shippingInfo).length > 0 && "#2ECC71"
                  }`,
                }}>
                Save
              </button>
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

              <StripeCheckout
                token={onToken}
                stripeKey="pk_test_51LH6jeCiKvgC8IeKM4rtYjbBJl7atZYw4nV2nEDTW3uT4O1M3zxIiRW9aSqUkC0gnzMjSjosB9bDxRZo3L9LwCNc00rFbC1in1"
                amount={cartInfo.total}>
                <button
                  id="pay_btn"
                  type="submit"
                  className="shipping-btn  py-3"
                  disabled={loading}>
                  {loading ? (
                    <div class="spinner-border text-warning" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                    `Pay - ${cartInfo && cartInfo.total} TK`
                  )}
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
