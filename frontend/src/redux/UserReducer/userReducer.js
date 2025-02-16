import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, DELETE_USER } from "./actionType";

// Initial State
const initialState = {
    users: [],
    isLoading: false,
    isError: false
};

// Reducer
export const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_USERS_REQUEST:
            return { ...state, isLoading: true };

        case FETCH_USERS_SUCCESS:
            return { ...state, isLoading: false, users: payload };

        case FETCH_USERS_FAILURE:
            return { ...state, isLoading: false, isError: true };

        case DELETE_USER:
            return { ...state, users: state.users.filter(user => user._id !== payload) };

        default:
            return state;
    }
};
