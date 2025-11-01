import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isConnected: boolean;
  userData: Record<string, number | string> | null;
}

const initialState: UserState = {
  isConnected: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsUserConnected: (
      state,
      action: PayloadAction<Pick<UserState, "isConnected">>
    ) => {
      state.isConnected = action.payload.isConnected;
    },
    setUserData: (
      state,
      action: PayloadAction<Pick<UserState, "userData">>
    ) => {
      state.userData = action.payload.userData;
    },
    signout: (state) => {
      state.isConnected = false;
      state.userData = null;
    },
  },
});

export const { setIsUserConnected, setUserData, signout } = userSlice.actions;
export default userSlice.reducer;
