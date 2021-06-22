import axios from 'axios'

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERROR,
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    GET_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS
} from '../Types/authType'


// user register
export const userRegister = (formData) => async(dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/user/register', formData, config)

        localStorage.setItem("user", JSON.stringify(data));

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {

        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const userLogin = (email, password) => async(dispatch, getState) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST })

        const { data } = await axios.post('/api/user/login', { email, password })

        localStorage.setItem("user", JSON.stringify(data));

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data.user
        })

    } catch (e) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: e.response.data.message
        })
    }
}

export const userLogout = () => async(dispatch) => {
    try {
        dispatch({ type: LOGOUT_USER_REQUEST })

        await axios.get('/api/user/logout')

        dispatch({
            type: LOGOUT_USER_SUCCESS
        })

        localStorage.removeItem("user")

    } catch (e) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: e.response.data.message
        })
    }

}

export const getUser = () => async(dispatch) => {

    try {

        dispatch({ type: GET_USER_REQUEST })

        const { data } = await axios.get('/api/user/me')

        localStorage.setItem("user", JSON.stringify(data))

        dispatch({
            type: GET_USER_SUCCESS,
            payload: data.user
        })

    } catch (e) {
        dispatch({
            type: GET_USER_FAIL,
            payload: e.response.data.message
        })
    }
}

export const updateProfile = (formData) => async(dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/api/user/update/profile', formData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })


    } catch (e) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: e.response.data.message
        })
    }
}

export const updateUserPassword = (formData) => async(dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const { data } = await axios.put('/api/user/update/password', formData)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (e) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: e.response.data.message
        })
    }
}

export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR })
}