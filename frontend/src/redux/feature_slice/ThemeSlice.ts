import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../variable/ThemeVariable";

const initialState = Theme.Light;

const themeSlice = createSlice({
  name: "ThemeSlice",
  initialState,
  reducers: {
    themeBoot: (state) => {
      let theme: string | null = localStorage.getItem("theme");
      if (Number(theme) === Theme.Dark) {
        state = Theme.Dark;
      }
      if (Number(theme) === Theme.Light) {
        state = Theme.Light;
      }
      return state;
    },
    darkTheme: (state) => {
      state = Theme.Dark;
      localStorage.setItem("theme", String(Theme.Dark));
      return state;
    },
    lightTheme: (state) => {
      state = Theme.Light;
      localStorage.setItem("theme", String(Theme.Light));
      return state;
    },
  },
});

export const { themeBoot, darkTheme, lightTheme } = themeSlice.actions;

export default themeSlice.reducer;
