import { IconTicket, IconUser } from "@tabler/icons-react";
import Nav from "../../components/Nav";
import { Route, Routes } from "react-router-dom";
import FormInput from "../../components/FormInput";
import SideBar from "../../components/SideBar";
import EmployeeSideBar from "../../components/EmployeeSideBar";

const AdminDashboard = () => {
  return (
    <>
      <SideBar route={`/admin-dashboard`} />
      <div className="admin-container">
        <Nav icon={<IconTicket />} label="Tickets Request" />
        <Routes>
          <Route path="/users" element={<FormInput />} />
        </Routes>
      </div>
      <EmployeeSideBar/>
    </>
  );
};

export default AdminDashboard;
