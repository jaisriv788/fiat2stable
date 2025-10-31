import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  showSidebar: boolean;
  showDepositSlider: boolean;
  showWithdrawSlider: boolean;
  showConnectionSlider: boolean;
}

const initialState: ModelState = {
  showSidebar: false,
  showDepositSlider: false,
  showWithdrawSlider: false,
  showConnectionSlider: false,
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
  },
});

export const {
  setSidebar,
  setDepositSlider,
  setWithdrawSlider,
  setConnectionSlider,
} = modelSlice.actions;
export default modelSlice.reducer;
