import * as Types from '../types'

const initialState = {
    isLoading: true,
    video: {},
    videos: {},
    errors: {}
}

const videoReducer = (state=initialState, aciton) => {
    switch(aciton.type) {
        case Types.LOAD_VIDEOS:
            return {
                ...state,
                isLoading: false,
                videos: aciton.payload.videos,
                errors: {}
            }

        case Types.LOAD_SINGLE_VIDEO:
            return {
                ...state,
                isLoading: false,
                video: aciton.payload.video,
                error: {}
            }

        case Types.ERROR_VIDEO:
            return {
                ...state,
                isLoading: false,
                errors: aciton.payload.errors
            }

        default:
            return state
    }
}

export default videoReducer