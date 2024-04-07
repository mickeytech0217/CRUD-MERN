import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

//combining Reducers
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
});