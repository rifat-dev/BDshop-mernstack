import axios from 'axios'
import {
    CLEAR_ERROR,
    CREATE_ADMIN_PRODUCT_FAIL,
    CREATE_ADMIN_PRODUCT_REQUEST,
    CREATE_ADMIN_PRODUCT_SUCCESS,
    GET_ADMIN_ALL_ORDERS_FAIL,
    GET_ADMIN_ALL_ORDERS_REQUEST,
    GET_ADMIN_ALL_ORDERS_SUCCESS,
    GET_ADMIN_ALL_PRODUCTS_FAIL,
    GET_ADMIN_ALL_PRODUCTS_REQUEST,
    GET_ADMIN_ALL_PRODUCTS_SUCCESS,
    GET_ADMIN_ALL_USERS_FAIL,
    GET_ADMIN_ALL_USERS_REQUEST,
    GET_ADMIN_ALL_USERS_SUCCESS
} from '../Types/adminType'


export const getAdminUsers = () => async(dispatch) => {
    try {

        dispatch({ type: GET_ADMIN_ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/admin/users')

        dispatch({
            type: GET_ADMIN_ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (e) {
        dispatch({
            type: GET_ADMIN_ALL_USERS_FAIL,
            payload: e.response.data.message
        })
    }
}


export const getAdminProducts = () => async(dispatch) => {
    try {

        dispatch({ type: GET_ADMIN_ALL_PRODUCTS_REQUEST })

        const { data } = await axios.get('/api/admin/products')

        dispatch({
            type: GET_ADMIN_ALL_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (e) {
        dispatch({
            type: GET_ADMIN_ALL_PRODUCTS_FAIL,
            payload: e.response.data.message
        })
    }
}


export const getAdminOrders = () => async(dispatch) => {
    try {

        dispatch({ type: GET_ADMIN_ALL_ORDERS_REQUEST })

        const { data } = await axios.get('/api/admin/orders')
        dispatch({
            type: GET_ADMIN_ALL_ORDERS_SUCCESS,
            payload: {
                orders: data.orders,
                totalAmount: data.totalAmount
            }
        })

    } catch (e) {
        dispatch({
            type: GET_ADMIN_ALL_ORDERS_FAIL,
            payload: e.response.data.message
        })
    }
}

export const createAdminProducr = (formData) => async(dispatch) => {
    try {

        dispatch({ type: CREATE_ADMIN_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/admin/products/new', formData, config)

        console.log(data)

        dispatch({
            type: CREATE_ADMIN_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (e) {
        dispatch({
            type: CREATE_ADMIN_PRODUCT_FAIL,
            payload: e.response.data.message
        })
    }
}

export const clearError = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}