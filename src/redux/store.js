import cartReducer from "./cartSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = {
  cart: cartReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
