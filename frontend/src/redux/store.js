import {compose, applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import  {AuthReducer}  from "./AuthReducer/AuthReducer";
import  {itemsReducer}  from './ItemReducer/itemReducer';
import  {bookingsReducer}  from './BookingReducer/bookingReducer';
import  {usersReducer}  from './UserReducer/userReducer';
// import { AppReducer } from "./AppReducer/AppReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  items: itemsReducer,
  bookings: bookingsReducer,
  users: usersReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

export const store = createStore(rootReducer , composeEnhancers(applyMiddleware(thunk)))