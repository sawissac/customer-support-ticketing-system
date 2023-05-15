import React, { useState } from "react";
import Nav from "../../components/Nav";
import { IconMessage2 } from "@tabler/icons-react";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import Message from "../../components/Message";

const TicketView = () => {
  return (
    <>
      <div className="admin-container">
        <Nav
          icon={<IconMessage2 />}
          label="Ticket - View"
        />
        <Nav.Back
          link="/admin-dashboard/tickets"
          label="The Page Is Loading Slower..!"
        />
        <div className="admin-container__inner">
          <Message
            userName="Momo"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, excepturi odit. Incidunt dolores eaque quos porro velit consequatur in dolorem eum tenetur aspernatur, quidem dignissimos voluptatibus odit. Iusto, suscipit aperiam."
          />
          <Message.FileAttachment
            link="#"
            label="Error Report PDF.zip"
          />
        </div>
      </div>
      <EmployeeSideBar view />
    </>
  );
};

export default TicketView;
