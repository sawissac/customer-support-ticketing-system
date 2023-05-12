import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./components/AuthProvider";
import { useAppSelector } from "./redux/hook";
import { AuthRole } from "./redux/variable/AuthVariable";

function App() {
  const authRedux = useAppSelector((state) => state.auth);
  return (
    <React.Fragment>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<LoginPage />} />
          {authRedux.role === AuthRole.ADMIN && <Route path="/admin-dashboard/*" element={<AdminDashboard />} />}
          <Route path="*" element={<div>hello</div>} />
        </Routes>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
