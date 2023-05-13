import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../variable/ThemeVariable";

const initialState = Theme.Light;

const themeSlice = createSlice({
  name: "ThemeSlice",
  initialState,
  reducers: {
    darkTheme: (state) => {
      state = Theme.Dark;
      return state;
    },
    lightTheme: (state) => {
      state = Theme.Light;
      return state;
    },
  },
});

export const { darkTheme, lightTheme } = themeSlice.actions;

export default themeSlice.reducer;
