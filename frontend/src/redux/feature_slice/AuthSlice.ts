import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthInterface = {
  token: "",
  user: {
    id: 0,
    name: "",
  },
  auth: false,
  role: "",
};

const authSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    authBoot: function (state) {
      const token:AuthInterface = Cookies.get("userAuth") as unknown as AuthInterface;
      if(token){
        state = token;
      }
    },
  },
});

export const { authBoot } = authSlice.actions;

export default authSlice.reducer;
