import React from "react";
import Nav from "../../components/Nav";
import { IconUserPlus } from "@tabler/icons-react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/DropDown";
import { IconMenuOrder } from "@tabler/icons-react";

const ProjectCreate = () => {
  function onSubmitHandle(
    ev: React.FormEvent<HTMLFormElement>
  ) {
    ev.preventDefault();
  }
  function onClickHandle() {}
  return (
    <div className="admin-container">
      <Nav
        icon={<IconUserPlus />}
        label="User Create"
      />
      <Nav.Back
        link="/admin-dashboard/users"
        label="Create User"
      />
      <form
        action=""
        onClick={onSubmitHandle}
        className="form-container"
      >
        <Input
          label="Name"
          errorMessage="*require"
          placeholder="Name..."
        />
        <div className="form-dropdown-label">
          <label htmlFor="">Start Date</label>
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
              <Button
                type="button"
                onClick={onClickHandle}
                label="Admin"
              />
              <Button
                type="button"
                onClick={onClickHandle}
                label="Admin"
              />
            </>
          }
        />
        <div className="form-dropdown-label">
          <label htmlFor="">End Date</label>
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
              <Button
                type="button"
                onClick={onClickHandle}
                label="Admin"
              />
              <Button
                type="button"
                onClick={onClickHandle}
                label="Admin"
              />
            </>
          }
        />
        <Button
          type="button"
          label="Create"
          className="btn btn--form"
          onClick={onClickHandle}
        />
      </form>
    </div>
  );
};

export default ProjectCreate;
