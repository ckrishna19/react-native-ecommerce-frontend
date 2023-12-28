import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
import orderSlice from "./slice/orderSlice";

export default rootReducer = combineReducers({
  auth: authSlice,
  products: productSlice,
  cart: cartSlice,
  order: orderSlice,
});
