import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERROR
} from '../Types/authType'


export const authReducer = (state = { user: {}, isAuthenticated: false, loading: false }, action) => {

    switch (action.type) {
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOGOUT_USER_REQUEST:
        case GET_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return {
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
        case GET_USER_FAIL:
            return {
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_USER_FAIL:
            return {
                ...state,
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