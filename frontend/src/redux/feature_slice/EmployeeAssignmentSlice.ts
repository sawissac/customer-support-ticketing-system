import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { employeeAssignmentInit } from "./../variable/EmployeeAssignmentVariable";

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
    updateEmployeeAssignUrl: (state, action: PayloadAction<{ name: string }>) => {
      state.employeeUrl = action.payload.name;
      return state;
    },
    setRightSidebar: (state, action: PayloadAction<{ name: string }>) => {
      state.rightSideBar = action.payload.name;
      return state;
    },
    setTaskUpdate: (
      state,
      action: PayloadAction<{
        ticketId: number;
        projectId:number;
        subject: string;
        startDate: string;
        dueDate: string;
      }>
    ) => {
      state = { ...state, ...action.payload };
      return state;
    },
    setEmployeeAssignUpdate: (
      state,
      action: PayloadAction<{
        assignId: number;
        task: string;
        startDate: string;
        dueDate: string;
        employee: string;
        employeeId: number;
        status: string;
      }>
    ) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const {
  updateEmployeeAssignUrl,
  setTaskUpdate,
  setTaskView,
  updateTaskUrl,
  setRightSidebar,
  setEmployeeAssignUpdate
} = employeeProjectSlice.actions;

export default employeeProjectSlice.reducer;
