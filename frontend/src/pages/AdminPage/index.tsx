import { Route, Routes } from "react-router-dom";
import SideBar from "../../components/SideBar";
import UserCreatePage from "./UserCreatePage";
import EmployeeSideBar from "../../components/EmployeeSideBar";

const AdminDashboard = () => {
  return (
    <>
      <SideBar route={`/admin-dashboard`} />
      <Routes>
        <Route path="/users" element={<UserCreatePage />} />
      </Routes>
    </>
  );
};

export default AdminDashboard;
