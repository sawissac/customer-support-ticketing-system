import React from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { IconMenuOrder, IconUserUp } from "@tabler/icons-react";
import Nav from "../../components/Nav";

const EmployeeProjectsUpdate = () => {
  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }
  function onClickHandle() {}
  return (
    <div className="admin-container">
      <Nav icon={<IconUserUp />} label="Employee Project Update" />
      <form
        action=""
        onClick={onSubmitHandle}
        className="form-container"
      >
        <div className="form-dropdown-label">
          <label htmlFor="">Project</label>
          <span>*require</span>
        </div>
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              Project Id{" "}
              <IconMenuOrder size={20} />
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
          <label htmlFor="">Employee</label>
          <span>*require</span>
        </div>
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              Employee Id{" "}
              <IconMenuOrder size={20} />
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

export default EmployeeProjectsUpdate;
