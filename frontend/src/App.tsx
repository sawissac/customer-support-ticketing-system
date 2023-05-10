import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { darkTheme } from "./redux/feature_slice/ThemeSlice";
<<<<<<< HEAD
import LoginPage from "./pages/LoginPage";
=======
import AdminDashboard from "./pages/AdminPage";


function App() {
  const dispatch = useAppDispatch();
  const ThemeRedux = useAppSelector((state) => state.theme);

  function ChangeDarkTheme() {
    dispatch(darkTheme());
  }

  return (
    <React.Fragment>
        <Routes>
          <Route path="/" element={<React.Fragment />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
    </React.Fragment>
  );
}

export default App;
