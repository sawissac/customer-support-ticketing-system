import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { projectSidebarInit } from "../variable/ProjectSidebarVariable";

const initialState = projectSidebarInit;

const projectSidebarSlice = createSlice({
  name: "projectSidebarSlice",
  initialState,
  reducers: {
    setProjectSidebar: (
      state,
      action: PayloadAction<typeof projectSidebarInit>
    ) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setProjectSidebar } = projectSidebarSlice.actions;

export default projectSidebarSlice.reducer;
