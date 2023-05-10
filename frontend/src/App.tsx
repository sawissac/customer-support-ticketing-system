import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { darkTheme } from "./redux/feature_slice/ThemeSlice";
import AdminDashboard from "./pages/AdminPage";
import SideBar from "./components/SideBar";

function App() {
  const dispatch = useAppDispatch();
  const ThemeRedux = useAppSelector((state) => state.theme);

  function ChangeDarkTheme() {
    dispatch(darkTheme());
  }

  return (
    <React.Fragment>
      <SideBar route="/admin-dashboard" />
      <Routes>
        <Route path="/" element={<React.Fragment />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
