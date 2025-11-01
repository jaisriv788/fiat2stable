import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  showSidebar: boolean;
  showDepositSlider: boolean;
  showWithdrawSlider: boolean;
  showConnectionSlider: boolean;
  showErrorModel: boolean;
  showSuccessModel: boolean;
  showModelMsg: {
    title: string;
    msg: string;
  };
}

const initialState: ModelState = {
  showSidebar: false,
  showDepositSlider: false,
  showWithdrawSlider: false,
  showConnectionSlider: false,
  showErrorModel: false,
  showSuccessModel: false,
  showModelMsg: {
    title: "",
    msg: "",
  },
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setSidebar: (
      state,
      action: PayloadAction<Pick<ModelState, "showSidebar">>
    ) => {
      state.showSidebar = action.payload.showSidebar;
    },
    setDepositSlider: (
      state,
      action: PayloadAction<Pick<ModelState, "showDepositSlider">>
    ) => {
      state.showDepositSlider = action.payload.showDepositSlider;
    },
    setWithdrawSlider: (
      state,
      action: PayloadAction<Pick<ModelState, "showWithdrawSlider">>
    ) => {
      state.showWithdrawSlider = action.payload.showWithdrawSlider;
    },
    setConnectionSlider: (
      state,
      action: PayloadAction<Pick<ModelState, "showConnectionSlider">>
    ) => {
      state.showConnectionSlider = action.payload.showConnectionSlider;
    },
    setErrorModel: (
      state,
      action: PayloadAction<Pick<ModelState, "showErrorModel">>
    ) => {
      state.showErrorModel = action.payload.showErrorModel;
    },
    setSuccessModel: (
      state,
      action: PayloadAction<Pick<ModelState, "showSuccessModel">>
    ) => {
      state.showSuccessModel = action.payload.showSuccessModel;
    },
    setModelMsg: (
      state,
      action: PayloadAction<Pick<ModelState, "showModelMsg">>
    ) => {
      state.showModelMsg = action.payload.showModelMsg;
    },
  },
});

export const {
  setSidebar,
  setDepositSlider,
  setWithdrawSlider,
  setConnectionSlider,
  setErrorModel,
  setSuccessModel,
  setModelMsg,
} = modelSlice.actions;
export default modelSlice.reducer;
