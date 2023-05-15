import React from "react";
import Nav from "../../components/Nav";
import {  IconUserUp } from "@tabler/icons-react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/DropDown";
import { IconMenuOrder } from "@tabler/icons-react";

const UserUpdatePage = () => {
  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }
  function onClickHandle() {}
  return (
    <div className="admin-container">
      <Nav icon={<IconUserUp />} label="User Update Page" />
      <Nav.Back
        link="/admin-dashboard/users"
        label="Create Update"
      />
      <form action="" onClick={onSubmitHandle} className="form-container">
        <Input label="Name" errorMessage="*require" placeholder="Name..." />
        <Input label="Email" errorMessage="*require" placeholder="Email.." />
        <div className="form-dropdown-label">
          <label htmlFor="">Role</label>
          <span>*require</span>
        </div>
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              Role <IconMenuOrder size={20} />
            </>
          }
          dropdownClassName="form-dropdown"
          dropdownChildren={
            <>
              <Button type="button" onClick={onClickHandle} label="Admin" />
              <Button type="button" onClick={onClickHandle} label="Admin" />
            </>
          }
        />
        <Button type="button" label="Update" className="btn btn--form" onClick={onClickHandle} />
      </form>
    </div>
  );
};

export default UserUpdatePage;
