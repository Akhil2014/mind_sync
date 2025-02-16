import { FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCCESS, FETCH_BOOKINGS_FAILURE, ADD_BOOKING, CANCEL_BOOKING } from "./actionType";

// Initial State
const initialState = {
    bookings: [],
    isLoading: false,
    isError: false
};

// Reducer
export const bookingsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BOOKINGS_REQUEST:
            return { ...state, isLoading: true };

        case FETCH_BOOKINGS_SUCCESS:
            return { ...state, isLoading: false, bookings: payload };

        case FETCH_BOOKINGS_FAILURE:
            return { ...state, isLoading: false, isError: true };

        case ADD_BOOKING:
            return { ...state, bookings: [...state.bookings, payload] };

        case CANCEL_BOOKING:
            return {
                ...state,
                bookings: state.bookings.map(booking => booking._id === payload._id ? payload : booking)
            };

        default:
            return state;
    }
};
