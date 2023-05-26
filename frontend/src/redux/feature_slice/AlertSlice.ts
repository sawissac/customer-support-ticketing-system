import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertInit } from "../variable/AlertVariable";

const initialState = AlertInit;

const themeSlice = createSlice({
  name: "ThemeSlice",
  initialState,
  reducers: {
    setAlert: (
      state,
      action: PayloadAction<{
        message: string;
        state: string;
        seconds?: number;
      }>
    ) => {
      state.show = true;
      state.message = action.payload.message;
      state.state = action.payload.state;
      state.seconds = action.payload.seconds ? action.payload.seconds : 1000;
      return state;
    },
    closeAlert: (state) => {
      state.show = false;
    },
  },
});

export const { setAlert, closeAlert } = themeSlice.actions;

export default themeSlice.reducer;
