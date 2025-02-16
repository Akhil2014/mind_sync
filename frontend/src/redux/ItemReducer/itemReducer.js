import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./actionType";

// Initial State
const initialState = {
    items: [],
    isLoading: false,
    isError: false
};

// Reducer
export const itemsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ITEMS_REQUEST:
            return { ...state, isLoading: true };

        case FETCH_ITEMS_SUCCESS:
            return { ...state, isLoading: false, items: payload };

        case FETCH_ITEMS_FAILURE:
            return { ...state, isLoading: false, isError: true };

        case ADD_ITEM:
            return { ...state, items: [...state.items, payload] };

        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item => item._id === payload._id ? payload : item)
            };

        case DELETE_ITEM:
            return { ...state, items: state.items.filter(item => item._id !== payload) };

        default:
            return state;
    }
};
