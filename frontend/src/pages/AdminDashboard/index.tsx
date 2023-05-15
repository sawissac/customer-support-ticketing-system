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

const AdminDashboard = () => {
  return (
    <>
      <SideBar route={`/admin-dashboard`} />
      <Routes>
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/ticket-view" element={<TicketView />} />
        <Route path="/ticket-create" element={<TicketCreate />} />
        <Route path="/ticket-update" element={<TicketUpdate />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user-create" element={<UserCreatePage />} />
        <Route path="/user-update" element={<UserUpdatePage />} />
        <Route path="/employee-assignment" element={<EmployeeAssignment />} />
        <Route path="/employee-project" element={<EmployeeProjects />} />
        <Route path="/employee-project-create" element={<EmployeeProjectsCreate />} />
        <Route path="/employee-project-update" element={<EmployeeProjectsUpdate />} />
        <Route path="/customer-project-create" element={<CustomerProjectsCreate />} />
        <Route path="/customer-project-update" element={<CustomerProjectsUpdate />} />
      </Routes>
    </>
  );
};

export default AdminDashboard;
