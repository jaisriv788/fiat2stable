import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  isConnected: boolean;
  userData: Record<string, number | string> | null;
}

const initialState: UserState = {
  username: "tester@test.com",
  isConnected: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Pick<UserState, "username">>) => {
      state.username = action.payload.username;
    },
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
  },
});

export const { setUser, setIsUserConnected, setUserData } = userSlice.actions;
export default userSlice.reducer;
