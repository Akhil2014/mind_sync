import { LOGIN_API_FAILURE, LOGIN_API_REQUEST, LOGIN_API_SUCCESS, LOGOUT_USER } from "./actionType";

const initialState = {
    isLoading: false,
    isAuth: false,
    isError: false,
    token: "",
};

export const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_API_REQUEST:
            return { ...state, isLoading: true };

        case LOGIN_API_SUCCESS:
            return { ...state, isLoading: false, token: payload, isAuth: true };

        case LOGIN_API_FAILURE:
            return { ...state, isLoading: false, isAuth: false, token: "", isError: true };

        case LOGOUT_USER:
            return { ...state, isAuth: false, token: "" };

        default:
            return state;
    }
};
