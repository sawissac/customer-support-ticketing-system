import {
  createSlice,
} from "@reduxjs/toolkit";
import { userSidebarInit } from "../variable/UserSidebarVariable";

const initialState = userSidebarInit;

const userSidebarSlice = createSlice({
  name: "userSidebarSlice",
  initialState,
  reducers: {
    setUserSidebarId: (state, action) => {
      state.id = action.payload;
      return state;
    },
  },
});

export const { setUserSidebarId } = userSidebarSlice.actions;

export default userSidebarSlice.reducer;
