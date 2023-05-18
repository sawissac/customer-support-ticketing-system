import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TicketInit } from "../variable/TicketVariable";

const initialState = TicketInit;

const ticketSlice = createSlice({
  name: "ticketSlice",
  initialState,
  reducers: {
    setTicketView: (state, action: PayloadAction<{name: string}>)=>{
        state.view = action.payload.name;
        return state;
    }
  },
});

export const { setTicketView } = ticketSlice.actions;

export default ticketSlice.reducer;
