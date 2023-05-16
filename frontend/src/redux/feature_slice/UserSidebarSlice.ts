import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userSidebarInit } from "../variable/UserSidebarVariable";

const initialState = userSidebarInit;

const userSidebarSlice = createSlice({
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
    updateUserTableUrl: (state, action: PayloadAction<{message:string}>) => {
      state.state = action.payload.message;
      return state;
    },
    openRightSidebar:(state, action: PayloadAction<{name:string}>) => {
      state.rightSidebar = action.payload.name;
      return state;
    }, 
  },
});

export const { setUserState, updateUserTableUrl, openRightSidebar } = userSidebarSlice.actions;

export default userSidebarSlice.reducer;
