import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import UiBoot from "./components/UiBoot";
import { useAppSelector } from "./redux/hook";
import { AuthRole } from "./redux/variable/AuthVariable";
import AppAlert from "./components/AppAlert";
import ShowIf from "./components/Helper";
import { Theme } from "./redux/variable/ThemeVariable";
import { PageNotFound } from "./pages/404Page";
import EmployeeDashboard from "./pages/employee-dashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  const authRedux = useAppSelector((state) => state.auth);
  const alertRedux = useAppSelector((state) => state.alert);
  const themeRedux = useAppSelector((state) => state.theme);
  return (
    <div className={`app ${themeRedux === Theme.Dark ? "app--dark" : ""}`}>
      <UiBoot>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace={true}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          {authRedux.role === AuthRole.ADMIN && (
            <Route
              path="/admin-dashboard/*"
              element={<AdminDashboard />}
            />
          )}
          {authRedux.role === AuthRole.EMPLOYEE && (
            <Route
              path="/employee-dashboard/*"
              element={<EmployeeDashboard />}
            />
          )}
          {authRedux.role === AuthRole.CUSTOMER && (
            <Route
              path="/customer-dashboard/*"
              element={<CustomerDashboard/>}
            />
          )}
          <Route
            path="*"
            element={<PageNotFound/>}
          />
        </Routes>
        <ShowIf
          sif={alertRedux.show}
          show={<AppAlert />}
        />
      </UiBoot>
    </div>
  );
}

export default App;
