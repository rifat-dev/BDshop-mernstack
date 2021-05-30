import axios from 'axios'
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERROR,
    SINGLE_PRODUCT_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
} from '../Types/productType'


export const getAllProducts = () => async(dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })

        const { data } = await axios.get('/api/products')

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (e) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: e.response.data.message
        })
    }
}

export const getSingleProduct = (id) => async(dispatch) => {
    try {

        dispatch({ type: SINGLE_PRODUCT_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: SINGLE_PRODUCT_SUCCESS,
            payload: data.product
        })

    } catch (e) {
        dispatch({
            type: SINGLE_PRODUCT_FAIL,
            payload: e.response.data.message
        })
    }
}

export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR })
}