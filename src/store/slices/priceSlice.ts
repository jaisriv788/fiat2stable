import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PriceState {
  sellingPrice: string;
  buyingPrice: string;
}

const initialState: PriceState = {
  sellingPrice: "0.00",
  buyingPrice: "0.00",
};

const priceSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSellingPrice: (
      state,
      action: PayloadAction<Pick<PriceState, "sellingPrice">>
    ) => {
      state.sellingPrice = action.payload.sellingPrice;
    },
    setBuyingPrice: (
      state,
      action: PayloadAction<Pick<PriceState, "buyingPrice">>
    ) => {
      state.buyingPrice = action.payload.buyingPrice;
    },
  },
});

export const { setSellingPrice, setBuyingPrice } = priceSlice.actions;
export default priceSlice.reducer;
