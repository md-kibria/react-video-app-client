import { combineReducers } from "redux";
import videoReducer from "./videoReducer";
import commentReducer from "./commentReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    videos: videoReducer,
    comments: commentReducer,
    auth: authReducer
})

export default rootReducer