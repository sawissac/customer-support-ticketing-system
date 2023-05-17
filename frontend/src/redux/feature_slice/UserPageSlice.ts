import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userSidebarInit } from "../variable/UserPageVariable";

const initialState = userSidebarInit;

const userPageSlice = createSlice({
  name: "userSidebarSlice",
  initialState,
  reducers: {
    setUserState: (
      state,
      action: PayloadAction<{ id: number; email: string; name: string; role: string }>
    ) => {
      state = { ...state, ...action.payload };
      return state;
    },
    updateUserTableUrl: (state, action: PayloadAction<{ message: string }>) => {
      state.state = action.payload.message;
      return state;
    },
    openUserRightSidebar: (state, action: PayloadAction<{ name: string }>) => {
      state.rightSidebar = action.payload.name;
      return state;
    },
  },
});

export const { setUserState, updateUserTableUrl, openUserRightSidebar } = userPageSlice.actions;

export default userPageSlice.reducer;
