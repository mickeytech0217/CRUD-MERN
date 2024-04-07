import { SET_CURRENT_USER, AUTH_LOADING, GET_ERRORS, CLEAR_ERRORS } from "./types";
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Sending Data to Backend For User registration
export const registerUser = (userData, history) => (dispatch) => {
    dispatch(setAuthLoading());
    axios.post(`/api/users/register`, userData)
        .then((res) => {
            history.push("/");
            dispatch(setAuthLoading());
        }).catch((err) => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
            dispatch(setAuthLoading());
        })
}

//Login the user & get token
export const loginUser = (userData) => (dispatch) => {
    dispatch(setAuthLoading());
    axios.post(`/api/users/login`, userData)
        .then((res) => {

            //save to local storage
            const { token } = res.data;

            //set token to local storage
            localStorage.setItem("jwtToken", token);

            //setToken to auth header
            setAuthToken(token);

            //Decode Token to get User Data
            const decoded = jwt_decode(token);

            //set the current user
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
            dispatch(setAuthLoading())
        })
}

export const logoutUser = (history) => (dispatch) => {

    //remove token from localstorage
    localStorage.removeItem("jwtToken");

    //remove auth header for future requests
    setAuthToken(false);

    //set current user to {} which will also set isAuthenticated to false
    dispatch(setCurrentUser({}));

    //redirecting to login page
    window.location.pathname = "/";
}

//Change Loading State
export const setAuthLoading = () => {
    return {
        type: AUTH_LOADING,
    }
}

//Set current User
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};