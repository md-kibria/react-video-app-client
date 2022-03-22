import axios from "axios";
import * as Types from '../types'

export const loadComments = (id) => async dispatch => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/comment/${id}`)

        dispatch({
            type: Types.LOAD_COMMENTS,
            payload: {
                comments: data.comments
            }
        })
    } catch (error) {
        dispatch({
            type: Types.ERROR_COMMENT,
            payload: {
                errors: error.response.data
            }
        })
    }
}

export const addComment = (id, data) => async dispatch => {
    try {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/comment/create/${id}`, data)

        // if comment is done
        if (res.data.status === 'ok') {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/comment/${id}`)

            dispatch({
                type: Types.LOAD_COMMENTS,
                payload: {
                    comments: data.comments
                }
            })
        }

    } catch (error) {
        dispatch({
            type: Types.ERROR_COMMENT,
            payload: {
                errors: error.response.data
            }
        })
    }
}