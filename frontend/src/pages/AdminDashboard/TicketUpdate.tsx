import React, { useState } from "react";
import Nav from "../../components/Nav";
import { IconMessage2 } from "@tabler/icons-react";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import Button from "../../components/Button";
import Input from "../../components/Input";

const TicketUpdate = () => {
  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }
  function onClickHandle() {}
  return (
    <>
      <div className="admin-container admin-container--textarea">
        <Nav
          icon={<IconMessage2 />}
          label="Ticket - Create"
        />
        <Nav.Back
          link="/admin-dashboard/tickets"
          label="Create your ticket!"
        />
        <form
          action=""
          onClick={onSubmitHandle}
          className="form-container"
        >
          <Input
            label="Subject"
            errorMessage="*require"
            placeholder="Name..."
          />
          <Input.Textarea
            label="Description"
            errorMessage="*require"
            placeholder="Name..."
          />
          <Button
            type="button"
            label="Update Ticket"
            className="btn btn--form"
            onClick={onClickHandle}
          />
        </form>
      </div>
      {/* <EmployeeSideBar /> */}
    </>
  );
};

export default TicketUpdate;
