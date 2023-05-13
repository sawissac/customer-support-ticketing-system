import { createSlice } from "@reduxjs/toolkit";
import { Sidebar } from "../variable/SidebarVariable";

const initialState = Sidebar.Simplify;

const sidebarSlice = createSlice({
  name: "SidebarSlice",
  initialState,
  reducers: {
    detailMode: (state) => {
      state = Sidebar.Detail;
      return state;
    },
    simplifyMode: (state) => {
      state = Sidebar.Simplify;
      return state;
    },
  },
});

export const { detailMode, simplifyMode } = sidebarSlice.actions;

export default sidebarSlice.reducer;
