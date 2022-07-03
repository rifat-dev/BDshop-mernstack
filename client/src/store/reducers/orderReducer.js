import {
  CLEARE_ERROR,
  NEW_ORDER_CREATE_FAIL,
  NEW_ORDER_CREATE_REQUEST,
  NEW_ORDER_CREATE_RESET,
  NEW_ORDER_CREATE_SUCCESS,
  USER_ORDERS_GET_REQEST,
  USER_ORDERS_GET_SUCCESS,
  USER_ORDERS_GET_FAIL,
  SINGLE_ORDER_GET_REQEST,
  SINGLE_ORDER_GET_SUCCESS,
  SINGLE_ORDER_GET_FAIL,
} from "../Types/orderTypes";

export const myOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDERS_GET_REQEST:
      return {
        ...state,
        loading: true,
      };
    case USER_ORDERS_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case USER_ORDERS_GET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEARE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const singleOrderDetails = (
  state = { singleOrder: {}, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case SINGLE_ORDER_GET_REQEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_ORDER_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        singleOrder: action.payload,
      };
    case SINGLE_ORDER_GET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEARE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newOrder = (
  state = { newOrder: {}, loading: false, isCreated: false, error: null },
  action
) => {
  switch (action.type) {
    case NEW_ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        newOrder: action.payload.order,
        isCreated: action.payload.success,
      };
    case NEW_ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_ORDER_CREATE_RESET:
      return {
        ...state,
        isCreated: false,
      };
    case CLEARE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
