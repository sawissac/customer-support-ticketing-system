import React from "react"
import { NavLink, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { darkTheme } from "./redux/feature_slice/ThemeSlice";
<<<<<<< HEAD
import LoginPage from "./pages/LoginPage";
=======
import AdminDashboard from "./pages/AdminPage";
>>>>>>> main


function App() {
  const dispatch = useAppDispatch();
  const ThemeRedux = useAppSelector(state=>state.theme);

  function ChangeDarkTheme(){
    dispatch(darkTheme());
  }
  
  return (
    <React.Fragment>
        <NavLink 
           to={`/hello`}
           relative="path"
           className={({ isActive }) => {
             return isActive ? "active" : ""
           }}
        />
        <Routes>
<<<<<<< HEAD
          <Route path="/login" element={< LoginPage />} />
          <Route path="/:root" element={<React.Fragment />} />
=======
          <Route path="/" element={<React.Fragment />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
>>>>>>> main
        </Routes>
    </React.Fragment>
  )
}

export default App
