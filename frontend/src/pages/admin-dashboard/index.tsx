import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "../404Page";
import TicketsPage from "./Tickets";
import Users from "./Users";
import Task from "./Task";
import Projects from "./Projects";
import Report from "./Report";
import SideBar from "../../components/SideBar";
import { sidebarConfig } from "./SidebarConfig";

const AdminDashboard = () => {
  return (
    <>
      <SideBar route="/admin-dashboard" subRoutes={sidebarConfig} />
      <Routes> 
        <Route
          path="/tickets"
          element={<TicketsPage />}
        />
        <Route
          path="/projects"
          element={<Projects />}
        />
        <Route
          path="/users"
          element={<Users />}
        />
        <Route
          path="/tasks"
          element={<Task />}
        />
        <Route
          path="/dashboard"
          element={<Report/>}
        />
        <Route
          path="/*"
          element={<PageNotFound/>}
        />
      </Routes>
    </>
  );
};

export default AdminDashboard;
