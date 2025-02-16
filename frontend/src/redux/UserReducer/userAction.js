import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, DELETE_USER } from "./actionType";
import API from "../utils/axios";

// Fetch all users (Admin only)
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const res = await API.get("/admin/users");
        dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE });
    }
};

// Delete user (Admin only)
export const deleteUser = (id) => async (dispatch) => {
    try {
        await API.delete(`/admin/users/${id}`);
        dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
