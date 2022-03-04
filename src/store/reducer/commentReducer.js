import * as Types from '../types'

const initialState = {
    isLoading: true,
    comments: [],
    errors: {}
}

const commentReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.LOAD_COMMENTS:
            return {
                ...state,
                isLoading: false,
                comments: action.payload.comments,
                errors: {}
            }

        case Types.ERROR_COMMENT:
            return {
                ...state,
                isLoading: false,
                errors: action.payload.errors
            }

        default:
            return state
    }
}

export default commentReducer