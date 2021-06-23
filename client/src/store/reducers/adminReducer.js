import {
    CLEAR_CREATE_STATE,
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

export const adminDashboardTracker = (
    state = { isCreated: false, isUpdated: false, idDeleted: false, loading: false, error: null },
    action) => {
    switch (action.type) {
        case CREATE_ADMIN_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ADMIN_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: action.payload
            }
        case CREATE_ADMIN_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload ? action.payload : 'Error 500'
            }
        case CLEAR_CREATE_STATE:
            return {
                ...state,
                isCreated: false
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