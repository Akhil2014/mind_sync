import { LOGIN_API_FAILURE, LOGIN_API_REQUEST, LOGIN_API_SUCCESS } from "./actionType";
import API from '../utils/axios';

// Action Creators
export const loginRequest = () => ({
    type: LOGIN_API_REQUEST
});

export const loginSuccess = (token) => ({
    type: LOGIN_API_SUCCESS,
    payload: token
});

export const loginFailure = (error) => ({
    type: LOGIN_API_FAILURE,
    payload: error
});

// **Login Function (Updated to use your backend API)**
export const login = (payload, navigate) => (dispatch) => {
    dispatch(loginRequest());

    return API.post('/auth/login', payload)
        .then((res) => {
            // Store token & user info in localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            dispatch(loginSuccess(res.data.token));
            navigate('/dashboard'); // Redirect after successful login
        })
        .catch((error) => {
            console.error('Login failed:', error.response?.data?.error || 'Login error');
            dispatch(loginFailure(error.response?.data?.error || 'Invalid credentials'));
        });
};
