import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modelSlice from "./slices/modelSlice";
import priceSlice from "./slices/priceSlice";

const rootReducer = combineReducers({
  user: userReducer,
  model: modelSlice,
  price: priceSlice,
});

export default rootReducer;
