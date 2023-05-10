import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { darkTheme } from "./redux/feature_slice/ThemeSlice";
import AdminDashboard from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const dispatch = useAppDispatch();
  const ThemeRedux = useAppSelector((state) => state.theme);

  function ChangeDarkTheme() {
    dispatch(darkTheme());
  }

  return (
    <React.Fragment>
      <NavLink
        to={`/hello`}
        relative="path"
        className={({ isActive }) => {
          return isActive ? "active" : "";
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
