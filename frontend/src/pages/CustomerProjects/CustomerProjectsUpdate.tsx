import React from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { IconMenuOrder, IconUserUp } from "@tabler/icons-react";
import Nav from "../../components/Nav";

const CustomerProjectsUpdate = () => {
  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }
  function onClickHandle() {}
  return (
    <div className="customer-project-container">
      <Nav icon={<IconUserUp />} label="Customer Project Update Page" />
      <form action="" onClick={onSubmitHandle} className="form-container">
        <div className="label-container">
        <label htmlFor="">Project</label>
        <span>*require</span>
        </div>
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              Project Id <IconMenuOrder size={20} />
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
        
        <div className="label-container">
        <label htmlFor="">Customer</label>
        <span>*require</span>
        </div>
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              Employee Id <IconMenuOrder size={20} />
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

export default CustomerProjectsUpdate;
