import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./feature_slice/ThemeSlice";
import authSlice from "./feature_slice/AuthSlice";
import alertSlice from "./feature_slice/AlertSlice";
import UserSidebarSlice from "./feature_slice/UserPageSlice";
import ProjectSidebarSlice from "./feature_slice/ProjectPageSlice";
import EmployeeProjectSlice from "./feature_slice/EmployeeProjectSlice";
import TicketSlice from "./feature_slice/TicketSlice";
import EmployeeAssignmentSlice from "./feature_slice/EmployeeAssignmentSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice, 
    auth: authSlice,
    alert: alertSlice,
    userSidebar: UserSidebarSlice,
    projectSidebar: ProjectSidebarSlice,
    employeeProjectSidebar: EmployeeProjectSlice,
    ticket: TicketSlice,
    tasks: EmployeeAssignmentSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
