import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modelSlice from "./slices/modelSlice";
import priceSlice from "./slices/priceSlice";
import constSlice from "./slices/constSlice";

const rootReducer = combineReducers({
  user: userReducer,
  model: modelSlice,
  price: priceSlice,
  consts: constSlice,
});

export default rootReducer;
