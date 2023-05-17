import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { projectSidebarInit } from "../variable/ProjectPageVariable";

const initialState = projectSidebarInit;

const projectSidebarSlice = createSlice({
  name: "projectSidebarSlice",
  initialState,
  reducers: {
    setProjectState: (
      state,
      action: PayloadAction<{ project_id: number; project_name: string }>
    ) => {
      state = { ...state, ...action.payload };
      return state;
    },
    setProjectEmployee: (
      state,
      action: PayloadAction<{ employee_id: number; employee_name: string }>
    ) => {
      state = { ...state, ...action.payload };
      return state;
    },
    setProjectCustomer: (
      state,
      action: PayloadAction<{
        employee_id: number;
        employee_name: string;
      }>
    ) => {
      state = { ...state, ...action.payload };
      return state;
    },
    updateProjectTableUrl: (state, action: PayloadAction<{ message: string }>) => {
      state.state = action.payload.message;
      return state;
    },
    openProjectRightSidebar: (state, action: PayloadAction<{ name: string }>) => {
      state.rightSidebar = action.payload.name;
      return state;
    },
    setProjectView: (state, action: PayloadAction<{ name: string }>) => {
      state.view = action.payload.name;
      return state;
    },
  },
});

export const {
  setProjectEmployee,
  setProjectState,
  openProjectRightSidebar,
  updateProjectTableUrl,
  setProjectView,
} = projectSidebarSlice.actions;

export default projectSidebarSlice.reducer;
