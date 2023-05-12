import React from "react";
import Nav from "../../components/Nav";
import { IconUserPlus } from "@tabler/icons-react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/DropDown";
import { IconMenuOrder } from "@tabler/icons-react";
import TicketList from "../../components/TicketList";

const UserCreatePage = () => {
  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }
  function onClickHandle() {}
  return (
    <div className="admin-container">
      <Nav icon={<IconUserPlus />} label="User Create Page" />
      <TicketList
        description="I can,t pess my button"
        name="Zayar"
        company="Ace"
        priority="critical"
        status="open"
        day="1 day ago"
      />
      <form action="" onClick={onSubmitHandle} className="form-container">
        <Input label="Name" errorMessage="*require" placeholder="Name..." />
        <Input label="Email" errorMessage="*require" placeholder="Email.." />
        <Input label="Password" errorMessage="*require" placeholder="Password..." />
        <Input label="Comfirm Password" errorMessage="*require" placeholder="Comfirm Password..." />
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
        <Button type="button" label="Create" className="btn btn--user_create" onClick={onClickHandle} />
      </form>
    </div>
  );
};

export default UserCreatePage;
