import { FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCCESS, FETCH_BOOKINGS_FAILURE, ADD_BOOKING, CANCEL_BOOKING } from "./actionType";
import API from "../utils/axios";

// Fetch user bookings
export const fetchBookings = () => async (dispatch) => {
    dispatch({ type: FETCH_BOOKINGS_REQUEST });
    try {
        const res = await API.get("/bookings");
        dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_BOOKINGS_FAILURE });
    }
};

// Create new booking
export const createBooking = (bookingData) => async (dispatch) => {
    try {
        const res = await API.post("/bookings", bookingData);
        dispatch({ type: ADD_BOOKING, payload: res.data });
    } catch (error) {
        console.error("Error creating booking:", error);
    }
};

// Cancel booking
export const cancelBooking = (id) => async (dispatch) => {
    try {
        const res = await API.put(`/bookings/${id}/cancel`);
        dispatch({ type: CANCEL_BOOKING, payload: res.data });
    } catch (error) {
        console.error("Error canceling booking:", error);
    }
};
