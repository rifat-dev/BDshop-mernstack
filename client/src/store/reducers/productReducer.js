import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERROR,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_RESET,
    SINGLE_PRODUCT_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
} from '../Types/productType'

export const productsReducer = (state = { products: [], loading: false }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                // totalProducts: products.length
            }
        case ALL_PRODUCTS_FAIL:
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

export const singleProduct = (state = { product: {}, loading: false }, action) => {
    switch (action.type) {
        case SINGLE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case SINGLE_PRODUCT_FAIL:
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


export const productReview = (state = { isCreate: false, error: null }, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_CREATE_SUCCESS:
            return {
                ...state,
                isCreate: action.payload
            }
        case PRODUCT_REVIEW_CREATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case PRODUCT_REVIEW_RESET:
            return {
                ...state,
                isCreate: false
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