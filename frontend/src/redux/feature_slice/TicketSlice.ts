import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TicketInit } from "../variable/TicketVariable";

const initialState = TicketInit;

const ticketSlice = createSlice({
  name: "ticketSlice",
  initialState,
  reducers: {
    setTicketView: (state, action: PayloadAction<{ name: string }>) => {
      state.view = action.payload.name;
      return state;
    },
    updateTicketUrl: (state, action: PayloadAction<{ name: string }>) => {
      state.url = action.payload.name;
      return state;
    },
    setViewData: (
      state,
      action: PayloadAction<{
        ticketId?: number;
        userName?: string;
        subject?: string;
        description?: string;
        driveLink?: string;
        customerProjectId?: number;
        customerProjectName?: string;
        priority?: string;
        status?: string;
        startDate?: string;
        endDate?: string;
        time?: string;
      }>
    ) => {
      state = { ...state, ...action.payload };
      state.customerProjectName = action.payload.customerProjectName ? action.payload.customerProjectName : "";
      return state;
    },
  },
});

export const { setViewData, setTicketView, updateTicketUrl } = ticketSlice.actions;

export default ticketSlice.reducer;
