import { Route, Routes } from "react-router-dom";
import UserCreatePage from "./UserCreate";
import SideBar from "./Sidebar";
import TicketsPage from "./Tickets";
import UserUpdatePage from "./UserUpdate";
import EmployeeProjectsCreate from "./EmployeeProjectsCreate";
import EmployeeProjectsUpdate from "./EmployeeProjectsUpdate";
import CustomerProjectsUpdate from "./CustomerProjectsUpdate";
import CustomerProjectsCreate from "./CustomerProjectsCreate";
import Users from "./Users"; 
import EmployeeProjects from "./EmployeeProjects";
import TicketView from "./TicketView";
import TicketCreate from "./TicketCreate";
import TicketUpdate from "./TicketUpdate";
import EmployeeAssignment from "./EmployeeAssignment";
import Projects from "./Projects";
import ProjectCreate from "./ProjectsCreate";
import ProjectUpdate from "./ProjectsUpdate";
import CustomerProjects from "./CustomerProjects";

const AdminDashboard = () => {
  return (
    <>
      <SideBar route={`/admin-dashboard`} />
      <Routes>
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/ticket-view" element={<TicketView />} />
        <Route path="/ticket-create" element={<TicketCreate />} />
        <Route path="/ticket-update" element={<TicketUpdate />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/project-create" element={<ProjectCreate />} />
        <Route path="/project-update" element={<ProjectUpdate />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user-create" element={<UserCreatePage />} />
        <Route path="/user-update" element={<UserUpdatePage />} />
        <Route path="/employee-assignment" element={<EmployeeAssignment />} />
        <Route path="/employee-assignment-create" element={<EmployeeAssignment />} />
        <Route path="/employee-assignment-update" element={<EmployeeAssignment />} />
        <Route path="/employee-project" element={<EmployeeProjects />} />
        <Route path="/employee-project-create" element={<EmployeeProjectsCreate />} />
        <Route path="/employee-project-update" element={<EmployeeProjectsUpdate />} />
        <Route path="/customer-project" element={<CustomerProjects />} />
        <Route path="/customer-project-create" element={<CustomerProjectsCreate />} />
        <Route path="/customer-project-update" element={<CustomerProjectsUpdate />} />
      </Routes>
    </>
  );
};

export default AdminDashboard;
