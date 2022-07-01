import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { createNewOrder, cleareError } from "../../store/actions/orderActions";
import { NEW_ORDER_CREATE_RESET } from "../../store/Types/orderTypes";
import { CLEARE_CART } from "../../store/Types/cartType";

const Payment = ({ history }) => {
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

  const submitHandler = (e) => {
    e.preventDefault();

    order.paymentInfo = {
      id: 12435689,
      status: "success",
    };
    dispatch(createNewOrder(order));
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
                onChange={(e) => setCardNum(e.target.value)}
                id="card_num_field"
                className="form-control"
                value={cardNum}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                onChange={(e) => setCardExpir(e.target.value)}
                id="card_exp_field"
                className="form-control"
                value={cardExpir}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                onChange={(e) => setCardCvc(e.target.value)}
                value={cardCvc}
                id="card_cvc_field"
                className="form-control"
              />
            </div>

            <button
              id="pay_btn"
              type="submit"
              className="shipping-btn  py-3 "
              disabled={loding ? loding : false}>
              Pay {` - ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
