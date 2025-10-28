import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modelSlice from "./slices/modelSlice";

const rootReducer = combineReducers({
  user: userReducer,
  model: modelSlice,
});

export default rootReducer;
