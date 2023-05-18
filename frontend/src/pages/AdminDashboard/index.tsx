import { Route, Routes } from "react-router-dom";
import SideBar from "./Sidebar";
import TicketsPage from "./Tickets";
import Users from "./Users";
import EmployeeProjects from "./EmployeeProjects";
import EmployeeAssignment from "./EmployeeAssignment";
import Projects from "./Projects";
import CustomerProjects from "./CustomerProjects";

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
          element={<EmployeeAssignment />}
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
          path="/*"
          element={<h1>404</h1>}
        />
      </Routes>
    </>
  );
};

export default AdminDashboard;
