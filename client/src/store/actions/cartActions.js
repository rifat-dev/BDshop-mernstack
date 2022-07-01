import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../Types/cartType";

export const addToCartItem = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      _id: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity: parseInt(quantity),
    },
  });

  const {
    cart: { cartItems },
  } = getState();
  console.log(cartItems);

  localStorage.setItem("bdshop_cartItems", JSON.stringify(cartItems));
};

export const removeToCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_TO_CART,
    payload: id,
  });

  const {
    cart: { cartItems },
  } = getState();

  localStorage.setItem("bdshop_cartItems", JSON.stringify(cartItems));
};

export const saveShippingInfo =
  (city, address, phone) => (dispatch, getState) => {
    const data = {
      city,
      address,
      phone,
    };

    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });

    const {
      cart: { shippingInfo },
    } = getState();

    localStorage.setItem("bdshop_shipping", JSON.stringify(shippingInfo));
  };
