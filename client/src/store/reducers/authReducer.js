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
    CLEAR_ERROR,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PROFILE_REQUEST,
    DELETE_USER_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    DELETE_USER_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PROFILE_RESET,
    DELETE_USER_RESET,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PROFILE_FAIL,
    DELETE_USER_FAIL
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

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_PASSWORD_RESET:
        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_PROFILE_FAIL:
        case DELETE_USER_FAIL:
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