import React from "react"
import { NavLink, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { darkTheme } from "./redux/feature_slice/ThemeSlice";


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
          <Route path="/" element={<React.Fragment />} />
          <Route path="/:root" element={<React.Fragment />} />
        </Routes>
    </React.Fragment>
  )
}

export default App
