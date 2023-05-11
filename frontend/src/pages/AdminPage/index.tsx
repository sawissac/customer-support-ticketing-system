import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/DropDown";

const AdminDashboard = () => {
  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }

  function onClickHandle() {}
  return (
    <div className="user_form">
      <form action="" onClick={onSubmitHandle}>
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
        <Dropdown
          placement="bottom"
          buttonChildren={"Role"}
          dropdownChildren={"Admin"}
        />
        <Button
          type="button"
          label="Create"
          className="btn btn--user_create"
          onClick={onClickHandle}
        />
      </form>
    </div>
  );
};

export default AdminDashboard;
