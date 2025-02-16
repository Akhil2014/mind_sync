import { LOGIN_API_FAILURE, LOGIN_API_REQUEST, LOGIN_API_SUCCESS } from "./actionType"
import axios from 'axios'


export const loginRequest = () => {
    return {
        type:LOGIN_API_REQUEST
    }
}

export const loginSuccess = (payload) => {
    return {
        type:LOGIN_API_SUCCESS,
        payload,
    }
}

export const loginFailure = () => {
    return {
        type:LOGIN_API_FAILURE
    }
}

export const login = (payload) => (dispatch) => {
    dispatch(loginRequest()) 
    return (
        axios.post('https://reqres.in/api/login',payload)
        .then((r) => dispatch(loginSuccess(r.data.token)))
        .catch((e) => dispatch(loginFailure()))
    )
}