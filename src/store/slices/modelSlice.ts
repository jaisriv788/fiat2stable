import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  showSidebar: boolean;
  showDepositeSlider: boolean;
  showWithdrawSlider: boolean;
}

const initialState: ModelState = {
  showSidebar: false,
  showDepositeSlider: false,
  showWithdrawSlider: false,
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
    setDepositeSlider: (
      state,
      action: PayloadAction<Pick<ModelState, "showDepositeSlider">>
    ) => {
      state.showDepositeSlider = action.payload.showDepositeSlider;
    },
    setWithdrawSlider: (
      state,
      action: PayloadAction<Pick<ModelState, "showWithdrawSlider">>
    ) => {
      state.showWithdrawSlider = action.payload.showWithdrawSlider;
    },
  },
});

export const { setSidebar, setDepositeSlider, setWithdrawSlider } =
  modelSlice.actions;
export default modelSlice.reducer;
