import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SideBar from "./components/SideBar";
import AuthProvider from "./components/AuthProvider";
import { useAppSelector } from "./redux/hook";

function App() {
  const authRedux = useAppSelector((state) => state.auth);
  return (
    <React.Fragment>
      <AuthProvider>
        {authRedux.auth && <SideBar route="/admin-dashboard" />}
        <Routes>
          <Route path="/" element={<AuthProvider.LoginChecker />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
