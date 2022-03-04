import * as Types from '../types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const loginUser = (data) => async dispatch => {
    try {
        const res = await axios.post('/api/user/login', data)

        localStorage.setItem('auth_token', res.data.token)
        const user = jwtDecode(res.data.token)

        dispatch({
            type: Types.AUTH_USER,
            payload: {
                user
            }
        })
    } catch (error) {

        dispatch({
            type: Types.ERROR_USER,
            payload: {
                errors: error.response.data.errors
            }
        })
    }
}

export const signupUser = (data) => async dispatch => {
    try {
        const res = await axios.post('/api/user/signup', data)

        localStorage.setItem('auth_token', res.data.token)
        const user = jwtDecode(res.data.token)

        dispatch({
            type: Types.AUTH_USER,
            payload: {
                user
            }
        })
    } catch (error) {

        dispatch({
            type: Types.ERROR_USER,
            payload: {
                errors: error.response.data.errors
            }
        })
    }
}

export const logoutUser = () => async dispatch => {

    localStorage.clear('auth_token')
    dispatch({
        type: Types.LOGOUT_USER
    })
}