import { createSlice } from "@reduxjs/toolkit";

const initialState:AuthInterface = {
  token: "",
  user: {
    id: 0,
    name: "",
  },
  auth: false,
  role: ""
};

const authSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;