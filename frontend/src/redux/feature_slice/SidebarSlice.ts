import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import {
  Sidebar,
  SidebarInit,
} from "../variable/SidebarVariable";

const initialState = SidebarInit;

const sidebarSlice = createSlice({
  name: "SidebarSlice",
  initialState,
  reducers: {
    sidebarBoot: (state)=>{
      let activeRoute: string | null = localStorage.getItem('activeRoute');
      if(activeRoute){
        state.activeRoute = activeRoute;
      }
    },
    detailMode: (state) => {
      state.mode = Sidebar.Detail;
      return state;
    },
    simplifyMode: (state) => {
      state.mode = Sidebar.Simplify;
      return state;
    },
    setActiveRoute: (
      state,
      action: PayloadAction<string>
    ) => {
      state.activeRoute = action.payload;
      localStorage.setItem('activeRoute', action.payload);
      return state;
    },
  },
});

export const {
  detailMode,
  sidebarBoot,
  simplifyMode,
  setActiveRoute,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
