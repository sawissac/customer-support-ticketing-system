import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./feature_slice/ThemeSlice";
import authSlice from "./feature_slice/AuthSlice";
import sidebarSlice from "./feature_slice/SidebarSlice";
import alertSlice from "./feature_slice/AlertSlice";
import UserSidebarSlice from "./feature_slice/UserSidebarSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    sidebar: sidebarSlice,
    alert: alertSlice,
    userSidebar: UserSidebarSlice
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;
export type AppDispatch = typeof store.dispatch;
