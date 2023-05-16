import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import UiBoot from "./components/UiBoot";
import { useAppSelector } from "./redux/hook";
import { AuthRole } from "./redux/variable/AuthVariable";
import AppAlert from "./components/AppAlert";
import ShowIf from "./components/Helper";

function App() {
  const authRedux = useAppSelector((state) => state.auth);
  const alertRedux = useAppSelector((state) => state.alert);
  return (
    <React.Fragment>
      <UiBoot>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<LoginPage />} />
          {authRedux.role === AuthRole.ADMIN && <Route path="/admin-dashboard/*" element={<AdminDashboard />} />}
          <Route path="*" element={<div>hello</div>} />
        </Routes>
        <ShowIf sif={alertRedux.show} show={<AppAlert />}/>
        
      </UiBoot>
    </React.Fragment>
  );
}

export default App;
