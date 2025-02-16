import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./actionType";
import API from "../utils/axios";

// Fetch all items
export const fetchItems = () => async (dispatch) => {
    dispatch({ type: FETCH_ITEMS_REQUEST });
    try {
        const res = await API.get("/items");
        dispatch({ type: FETCH_ITEMS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_ITEMS_FAILURE });
    }
};

// Add new item (Admin only)
export const addItem = (itemData) => async (dispatch) => {
    try {
        const res = await API.post("/items", itemData);
        dispatch({ type: ADD_ITEM, payload: res.data });
    } catch (error) {
        console.error("Error adding item:", error);
    }
};

// Update item (Admin only)
export const updateItem = (id, updatedData) => async (dispatch) => {
    try {
        const res = await API.put(`/items/${id}`, updatedData);
        dispatch({ type: UPDATE_ITEM, payload: res.data });
    } catch (error) {
        console.error("Error updating item:", error);
    }
};

// Delete item (Admin only)
export const deleteItem = (id) => async (dispatch) => {
    try {
        await API.delete(`/items/${id}`);
        dispatch({ type: DELETE_ITEM, payload: id });
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};
