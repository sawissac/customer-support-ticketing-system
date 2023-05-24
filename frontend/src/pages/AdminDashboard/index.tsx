import { Route, Routes } from "react-router-dom";
import SideBar from "./Sidebar";
import TicketsPage from "./Tickets";
import Users from "./Users";
import EmployeeProjects from "./EmployeeProjects";
import Task from "./Task";
import Projects from "./Projects";
import CustomerProjects from "./CustomerProjects";
import { PageNotFound } from "../404Page";
import Report from "./Report";

const AdminDashboard = () => {
  return (
    <>
      <SideBar route={`/admin-dashboard`} />
      <Routes> 
        <Route
          path="/tickets"
          element={<TicketsPage />}
        />
        <Route
          path="/project"
          element={<Projects />}
        />
        <Route
          path="/users"
          element={<Users />}
        />
        <Route
          path="/employee-assignment"
          element={<Task />}
        />
        <Route
          path="/employee-project"
          element={<EmployeeProjects />}
        />
        <Route
          path="/customer-project"
          element={<CustomerProjects />}
        />
        <Route
          path="/report-history"
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
