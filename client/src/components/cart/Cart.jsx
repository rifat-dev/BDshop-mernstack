import "./cart.scss";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";

import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import { addToCartItem, removeToCart } from "../../store/actions/cartActions";

import emptyCartSvg from "../../assets/emptyCart.svg";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [applyedCoupon, setApplyedCoupon] = useState({});

  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const increment = (id, qty) => {
    dispatch(addToCartItem(id, qty + 1));
  };
  const decrement = (id, qty) => {
    dispatch(addToCartItem(id, qty - 1));
  };

  useEffect(() => {
    // Calculate Order Prices
    const itemsPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(itemsPrice);
  }, [cartItems, dispatch]);

  // process coupon
  const getCoupon = async () => {
    const { data } = await axios.get(
      `/api/user/coupon/${couponCode.toLocaleUpperCase()}`
    );
    // console.log(data);
    if (data.coupon.length > 0) {
      let coupon = data.coupon[0];
      if (coupon.type === "Percentage") {
        if (coupon.usageLimit > 0) {
          setDiscount(
            (Number(coupon.discountValue) / 100).toFixed(2) * subtotal
          );
          setApplyedCoupon(coupon);
          alert.success(`Coupon code: ${coupon.code} Applyed success`);
        }
      } else {
        if (coupon.usageLimit > 0) {
          setDiscount(parseInt(coupon.discountValue));
          setApplyedCoupon(coupon);
          alert.success(`Coupon code: ${coupon.code} Applyed success`);
        }
      }
    } else {
      alert.error(`coupon code: ${couponCode} not valid`);
    }
  };

  useEffect(() => {
    let shippingPrice = subtotal > 2000 ? 0 : 50;
    let totalAmount = Number((subtotal - discount + shippingPrice).toFixed(2));
    setShipping(shippingPrice);
    setTotal(totalAmount);
  }, [subtotal, discount]);

  const checkOutProcess = () => {
    let cartInfo = {
      subtotal,
      shipping,
      applyedCoupon,
      discount,
      total,
    };

    sessionStorage.setItem("cartInfo", JSON.stringify(cartInfo));
  };

  return (
    <div className="cart table-responsive">
      <MetaData title={"Chart Items"} />
      {cartItems.length === 0 ? (
        <div className="empty_cart">
          <div className="empty_cart_body">
            <img src={emptyCartSvg} alt="Empty Cart" />
          </div>
          <Link to="/shop">
            <button className="cart-btn">
              <i className="bi bi-arrow-left-short"></i>
              Go To Shop
            </button>
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="container-fluid my-4">
            <table className="table product-table shadow-sm my-5">
              <thead className="table-head">
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>QTY</th>
                  <th></th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((product) => (
                  <tr>
                    <th scope="row">
                      <img
                        src={product.image}
                        alt="Product"
                        className="product-image"
                      />
                    </th>
                    <td>
                      <h5>
                        <strong>{product.name}</strong>
                      </h5>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <div className="row">
                        <div className="btn-group" data-toggle="buttons">
                          <label
                            className="qnt-btn"
                            onClick={() =>
                              product.quantity > 1
                                ? decrement(product._id, product.quantity)
                                : alert.error(
                                    "you can not remove product quantity"
                                  )
                            }
                            style={{ fontSize: "15px" }}>
                            <RemoveCircleIcon />
                          </label>
                          <label
                            className="qnt-btn"
                            onClick={() =>
                              product.stock > product.quantity
                                ? increment(product._id, product.quantity)
                                : alert.error("Product Stock Is Finished")
                            }
                            style={{ fontSize: "15px" }}>
                            <AddCircleIcon />
                          </label>
                        </div>
                      </div>
                    </td>
                    <td>{product.price * product.quantity}</td>
                    <td>
                      <DeleteIcon
                        type="button"
                        onClick={() => dispatch(removeToCart(product._id))}
                        className="cart-delete-btn"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Remove item"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row cart-bottom">
              <div className=" col-12 col-md-6">
                <div className="coupon_code left">
                  <h3>Coupon</h3>
                  <div className="coupon_inner">
                    <p>Enter your coupon code if you have one.</p>
                    <form>
                      <input
                        className="mb-2"
                        placeholder="Coupon code"
                        type="text"
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button
                        type="button"
                        className=""
                        onClick={() => getCoupon()}>
                        Apply coupon
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="cart-total col-12 col-md-6">
                <div className="coupon_code right">
                  <h3>Cart Total</h3>
                  <div className="coupon_inner">
                    <div className="cart_subtotal">
                      <p>Subtotal</p>
                      <p className="cart_amount">{`৳ ${subtotal}`}</p>
                    </div>
                    <div className="cart_subtotal ">
                      <p>Shipping</p>
                      <p className="cart_amount">
                        <span>Flat Rate:</span> ৳ {shipping}
                      </p>
                    </div>

                    <div className="cart_subtotal ">
                      <p>Discount Amount</p>
                      <p className="cart_amount">{`৳ ${discount}`}</p>
                    </div>

                    <div className="cart_subtotal">
                      <p>Total</p>
                      <p className="cart_amount">{`৳ ${total}`}</p>
                    </div>
                    {isAuthenticated ? (
                      <Link to="/checkout">
                        <button
                          type="button"
                          className="cart-btn"
                          onClick={() => checkOutProcess()}>
                          Proceed to Checkout{" "}
                          <i className="fa fa-angle-right right"></i>
                        </button>
                      </Link>
                    ) : (
                      <Link to="/login">
                        <button type="button" className="cart-btn">
                          {" "}
                          LogIn to purchase <LoginIcon />
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
