import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import {
  AlertInit,
} from "../variable/AlertVariable";

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
      }>
    ) => {
      state.show = true;
      state.message = action.payload.message;
      state.state = action.payload.state;
      return state;
    },
    closeAlert: (state) => {
      state.show = false;
    },
  },
});

export const { setAlert, closeAlert } =
  themeSlice.actions;

export default themeSlice.reducer;
