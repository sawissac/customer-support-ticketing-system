import { Route, Routes } from "react-router-dom";
import UserCreatePage from "./UserCreatePage";
import SideBar from "./Sidebar";
import TicketsPage from "./TicketsPage";

const AdminDashboard = () => {
  return (
    <>
      <SideBar route={`/admin-dashboard`} />
      <Routes>
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/user-create" element={<UserCreatePage />} />
      </Routes>
    </>
  );
};

export default AdminDashboard;
