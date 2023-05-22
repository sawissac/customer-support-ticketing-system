import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { employeeAssignmentInit } from './../variable/EmployeeAssignmentVariable';

const initialState = employeeAssignmentInit;

const employeeProjectSlice = createSlice({
  name: "employeeProjectSlice",
  initialState,
  reducers: {
    setTaskView: (state, action: PayloadAction<{ name: string }>) => {
      state.view = action.payload.name;
      return state;
    },
    updateTaskUrl: (state, action: PayloadAction<{ name: string }>) => {
      state.url = action.payload.name;
      return state;
    },
    setRightSidebar: (state, action: PayloadAction<{ name: string }>) => {
      state.rightSideBar = action.payload.name;
      return state;
    },
  },
});

export const { setTaskView, updateTaskUrl,setRightSidebar } = employeeProjectSlice.actions;

export default employeeProjectSlice.reducer;