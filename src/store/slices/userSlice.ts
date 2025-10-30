import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  isConnected: boolean;
}

const initialState: UserState = {
  username: "tester@test.com",
  isConnected: false,
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
  },
});

export const { setUser, setIsUserConnected } = userSlice.actions;
export default userSlice.reducer;
