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
    LOGOUT_USER_FAIL
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

export const userLogin = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST })

        const { data } = await axios.post('/api/user/login', { email, password })

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

    } catch (e) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: e.response.data.message
        })
    }

}
export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR })
}