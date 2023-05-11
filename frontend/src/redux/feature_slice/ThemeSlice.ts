import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../variable/ThemeVariable";

const initialState = Theme.Light;

const themeSlice = createSlice({
  name: "ThemeSlice",
  initialState,
  reducers: {
    darkTheme: (state) => {
        state = Theme.Dark;
    },
    lightTheme: (state)=>{
        state = Theme.Light;
    }
  },
});

export const {darkTheme, lightTheme} = themeSlice.actions;

export default themeSlice.reducer;