import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { employeeProjectSidebarInit } from "../variable/EmployeeProjectVariable";

const initialState = employeeProjectSidebarInit;

const employeeProjectSlice = createSlice({
  name: "employeeProjectSlice",
  initialState,
  reducers: {
    setEmployeeProject: (
      state,
      action: PayloadAction<typeof employeeProjectSidebarInit>
    ) => {
      state = action.payload;
      return state;
    },resetEmployeeProjectPage: (state)=>{
    state = employeeProjectSidebarInit;
    return state;
  }
  },
  
});

export const { setEmployeeProject,resetEmployeeProjectPage } = employeeProjectSlice.actions;

export default employeeProjectSlice.reducer;
