import * as Types from '../types'

const initialState = {
    isLoggedIn: false,
    user: {},
    errors: {}
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case Types.AUTH_USER:
            return {
                isLoggedIn: true,
                user: action.payload.user,
                errors: {}
            }

        case Types.LOGOUT_USER:
            return {
                isLoggedIn: false,
                user: {},
                errors: {}
            }

        case Types.ERROR_USER:
            return {
                ...state,
                errors: action.payload.errors
            }

        default:
            return state
    }
}

export default authReducer