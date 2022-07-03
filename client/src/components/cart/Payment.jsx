import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { createNewOrder, cleareError } from "../../store/actions/orderActions";
import { NEW_ORDER_CREATE_RESET } from "../../store/Types/orderTypes";
import { CLEARE_CART } from "../../store/Types/cartType";

const Payment = ({ history }) => {
  const [cartInfo, setCartInfo] = useState(() => {
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

  const [cardNum, setCardNum] = useState("");
  const [cardExpir, setCardExpir] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { isCreated, loding, error } = useSelector((state) => state.newOrder);

  const stripe = useStripe();
  const elements = useElements();

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const alert = useAlert();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    console.log(paymentMethod);

    // dispatch(createNewOrder(order));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(cleareError());
    }

    if (isCreated) {
      alert.success("Order Created Successfully");
      history.push("/profile/me/orders");
      dispatch({ type: NEW_ORDER_CREATE_RESET });
      dispatch({ type: CLEARE_CART });
      sessionStorage.removeItem("orderInfo");
    }
  }, [error, alert, dispatch, isCreated, history]);

  return (
    <div>
      <div className="row">
        <div className="box-shadow">
          <form onSubmit={submitHandler}>
            <div className="check-heading">
              <h3>Make Payment</h3>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
              />
            </div>

            <button
              id="pay_btn"
              type="submit"
              className="shipping-btn  py-3 "
              disabled={!stripe || !elements}>
              Pay {` - ${cartInfo && cartInfo.total}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
