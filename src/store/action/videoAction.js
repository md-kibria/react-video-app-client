import axios from 'axios'
import * as Types from '../types'

export const loadVideos = () => async dispatch => {
    try {
        const videos = await axios.get('/api/video')

        dispatch({
            type: Types.LOAD_VIDEOS,
            payload: {
                videos: videos.data
            }
        })

    } catch (error) {
        dispatch({
            type: Types.ERROR_VIDEO,
            payload: {
                errors: error.response.data.errors
            }
        })
    }
}

export const loadSingleVideo = (id) => async dispatch => {
    try {
        const {data} = await axios.get(`/api/video/${id}`)

        dispatch({
            type: Types.LOAD_SINGLE_VIDEO,
            payload: {
                video: data.video
            }
        })
    } catch (error) {
        dispatch({
            type: Types.ERROR_VIDEO,
            payload: {
                errors: error.response.data.errors
            }
        })
    }
}

export const searchVideo = (q) => async dispatch =>{
    try {
        const {data} = await axios.get(`/api/video/search?q=${q}`)
        let mdfData = {
            ...data,
            videos: data.videos || []
        }
        dispatch({
            type: Types.LOAD_VIDEOS,
            payload: {
                videos: mdfData
            }
        })
    } catch (error) {
        dispatch({
            type: Types.ERROR_VIDEO,
            payload: {
                errors: error.response.data.errors
            }
        })
    }
}