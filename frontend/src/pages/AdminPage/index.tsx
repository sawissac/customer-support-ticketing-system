import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
const AdminDashboard = () => {
  return (
    <div className="user_form">
      <form action="">
        <Input label="Name" errorMessage="*require" placeholder="Name..." />
        <Input label="Email" errorMessage="*require" placeholder="Email.." />
        <Input
          label="Password"
          errorMessage="*require"
          placeholder="Password..."
        />
        <Input
          label="Comfirm Password..."
          errorMessage="*require"
          placeholder="Comfirm Password..."
        />
        <Button type="button" label="Create" className="btn btn--user_create"/>
      </form>
    </div>
  );
};

export default AdminDashboard;
