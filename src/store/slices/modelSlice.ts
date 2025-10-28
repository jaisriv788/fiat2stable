import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  showSidebar: boolean;
}

const initialState: ModelState = {
  showSidebar: false,
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
  },
});

export const { setSidebar } = modelSlice.actions;
export default modelSlice.reducer;
