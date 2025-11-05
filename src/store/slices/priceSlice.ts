import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// import type { RootState } from "../store";

interface BalanceData {
  total_usdt: string;
  total_inr: string;
}

interface LimitData {
  buy_limit: string;
  sell_limit: string;
  verified_social_media: string;
}

interface PriceState {
  sellingPrice: string;
  buyingPrice: string;
  fetchBalance: boolean;
  balance: BalanceData | null;
  loading: boolean;
  error: string | null;
  limit: LimitData | null;
}

const initialState: PriceState = {
  sellingPrice: "0.00",
  buyingPrice: "0.00",
  balance: null,
  fetchBalance: false,
  loading: false,
  error: null,
  limit: null,
};

export const fetchBalanceThunk = createAsyncThunk<
  BalanceData,
  { baseUrl: string; userId: string; token: string },
  { rejectValue: string }
>(
  "price/fetchBalanceThunk",
  async ({ baseUrl, userId, token }, { rejectWithValue }) => {
    try {
      // console.log({ baseUrl, userId, token });
      const response = await axios.post(
        `${baseUrl}/user-available-balance`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log({ response });
      const data = response.data?.data;
      if (!data || !data.total_usdt || !data.total_inr) {
        return rejectWithValue("Invalid balance data");
      }
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch balance");
    }
  }
);

const priceSlice = createSlice({
  name: "price",
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
    getBalance: (
      state,
      action: PayloadAction<Pick<PriceState, "fetchBalance">>
    ) => {
      state.fetchBalance = action.payload.fetchBalance;
    },
    setBalance: (state, action: PayloadAction<Pick<PriceState, "balance">>) => {
      state.balance = action.payload.balance;
    },
    setLimit: (state, action: PayloadAction<Pick<PriceState, "limit">>) => {
      state.limit = action.payload.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalanceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalanceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalanceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching balance";
        state.balance = state.balance ?? { total_usdt: "0", total_inr: "0" };
      });
  },
});

export const {
  setSellingPrice,
  setBuyingPrice,
  setLimit,
  setBalance,
  getBalance,
} = priceSlice.actions;
export default priceSlice.reducer;
