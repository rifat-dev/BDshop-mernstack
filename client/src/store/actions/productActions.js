import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERROR,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
} from "../Types/productType";

export const getAllProducts =
  (ctg = "", page = 1, searchTerm = "", perPage = 6) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      const { data } = await axios.get(
        `/api/products?ctg=${ctg}&searchTerm=${searchTerm}&page=${page}&perPage=${perPage}`
      );

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: {
          products: data.products,
          totalPage: data.totalPage,
        },
      });
    } catch (e) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: e.response.data.message,
      });
    }
  };

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: SINGLE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (e) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload: e.response.data.message,
    });
  }
};

export const createProductReview = (id, review) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/api/products/create-review/${id}`,
      review
    );

    dispatch({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: data.success,
    });
  } catch (e) {
    dispatch({
      type: PRODUCT_REVIEW_CREATE_FAIL,
      payload: e.response.data.message,
    });
  }
};

export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
