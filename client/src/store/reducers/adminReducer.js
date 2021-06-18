import {
    CLEAR_ERROR,
    GET_ADMIN_ALL_ORDERS_FAIL,
    GET_ADMIN_ALL_ORDERS_REQUEST,
    GET_ADMIN_ALL_ORDERS_SUCCESS,
    GET_ADMIN_ALL_PRODUCTS_FAIL,
    GET_ADMIN_ALL_PRODUCTS_REQUEST,
    GET_ADMIN_ALL_PRODUCTS_SUCCESS,
    GET_ADMIN_ALL_USERS_FAIL,
    GET_ADMIN_ALL_USERS_REQUEST,
    GET_ADMIN_ALL_USERS_SUCCESS,

} from '../Types/adminType'


export const adminAllUsersReducer = (state = { users: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_ADMIN_ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ADMIN_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case GET_ADMIN_ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


export const adminAllProductsReducer = (state = { products: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_ADMIN_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ADMIN_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case GET_ADMIN_ALL_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


export const adminAllOrdersReducer = (state = { orders: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_ADMIN_ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ADMIN_ALL_ORDERS_SUCCESS:
            console.log(action)
            return {
                ...state,
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }
        case GET_ADMIN_ALL_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}