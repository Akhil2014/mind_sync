import {compose, applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./AuthReducer/AuthReducer";
// import { AppReducer } from "./AppReducer/AppReducer";

const rootReducer = combineReducers({
    AuthReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

export const store = createStore(rootReducer , composeEnhancers(applyMiddleware(thunk)))