import axios from "axios";

import {
  CLEARE_ERROR,
  NEW_ORDER_CREATE_FAIL,
  NEW_ORDER_CREATE_REQUEST,
  NEW_ORDER_CREATE_SUCCESS,
  SINGLE_ORDER_GET_FAIL,
  SINGLE_ORDER_GET_REQEST,
  SINGLE_ORDER_GET_SUCCESS,
  USER_ORDERS_GET_FAIL,
  USER_ORDERS_GET_REQEST,
  USER_ORDERS_GET_SUCCESS,
} from "../Types/orderTypes";

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: USER_ORDERS_GET_REQEST });

    const { data } = await axios("/api/order/my");
    // console.log(data)
    dispatch({
      type: USER_ORDERS_GET_SUCCESS,
      payload: data.orders,
    });
  } catch (e) {
    dispatch({
      type: USER_ORDERS_GET_FAIL,
      payload: e.response.data.message,
    });
  }
};

export const getMySingleOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_ORDER_GET_REQEST });

    const { data } = await axios.get(`/api/order/${id}`);

    dispatch({
      type: SINGLE_ORDER_GET_SUCCESS,
      payload: data.order,
    });
  } catch (e) {
    dispatch({
      type: SINGLE_ORDER_GET_FAIL,
      payload: e.response.data.message,
    });
  }
};

export const createNewOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ORDER_CREATE_REQUEST });

    const { data } = await axios.post("/api/order/new", orderData);

    dispatch({
      type: NEW_ORDER_CREATE_SUCCESS,
      payload: {
        order: data.order,
        success: data.success,
      },
    });
  } catch (e) {
    dispatch({
      type: NEW_ORDER_CREATE_FAIL,
      payload: e.response.data.message,
    });
  }
};

export const cleareError = () => (dispatch) => {
  dispatch({ type: CLEARE_ERROR });
};
