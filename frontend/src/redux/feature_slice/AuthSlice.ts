import Cookies from "js-cookie";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthInterface, DefaultAuthState } from "../variable/AuthVariable";

const initialState: AuthInterface = DefaultAuthState;

const authSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    authBoot: function (state) {
      let userAuth: string | undefined | AuthInterface = Cookies.get("userAuth");
      if (userAuth) {
        userAuth = JSON.parse(userAuth) as unknown as AuthInterface;
        state.auth = userAuth.auth;
        state.role = userAuth.role;
        state.token = userAuth.token;
        state.user = userAuth.user;
      }
      return state;
    },
    setAuth: function (state, action: PayloadAction<AuthInterface>) {
      state.auth = action.payload.auth;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set("userAuth", JSON.stringify(state));
      return state;
    },
    resetAuth: function (state) {
      state.auth = DefaultAuthState.auth;
      state.role = DefaultAuthState.role;
      state.token = DefaultAuthState.token;
      state.user = DefaultAuthState.user;
      Cookies.remove("userAuth");
      return state;
    },
  },
});

export const { authBoot, setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
