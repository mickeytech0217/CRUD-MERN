import { SET_CURRENT_USER, AUTH_LOADING } from "../actions/types";
import isEmpty from '../utils/is-empty';
const initialState = {
    isAuthenticated: false,
    loading: false,
    user: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                //Authentication Check
            };
        case AUTH_LOADING:
            return {
                ...state,
                loading: !state.loading,
            }
        default: return state;
    }
}