import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userSidebarInit } from "../variable/UserSidebarVariable";

const initialState = userSidebarInit;

const userSidebarSlice = createSlice({
  name: "userSidebarSlice",
  initialState,
  reducers: {
    setUserSidebar: (
      state,
      action: PayloadAction<typeof userSidebarInit>
    ) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUserSidebar } = userSidebarSlice.actions;

export default userSidebarSlice.reducer;
