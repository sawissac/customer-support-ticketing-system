import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SideBar from "./components/SideBar";

function App() {
  return (
    <React.Fragment>
      <SideBar route="/admin-dashboard" />
      <Routes>
        <Route
          path="/"
          loader={({ params }) => {
            alert("hello"); 
            return 'hello'
          }}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
