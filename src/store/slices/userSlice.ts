import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
}

const initialState: UserState = {
  username: "jai",
};

const userSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
