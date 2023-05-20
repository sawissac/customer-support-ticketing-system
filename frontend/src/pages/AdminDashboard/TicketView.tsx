import React, { useState } from "react";
import Nav from "../../components/Nav";
import { IconMessage2 } from "@tabler/icons-react";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import Message from "../../components/Message";
import { useAppDispatch } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";

const TicketView = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="admin-container">
        <Nav.BackButton
          label="The Page Is Loading Slower..!"
          onClick={() => {
            dispatch(setTicketView({ name: "" }));
          }}
        />
        <div className="admin-container__inner">
          <fieldset className="fieldset-timer">
            <legend className="legend-timer">6:00PM</legend>
            <Message
              userName="Momo"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, excepturi odit. Incidunt dolores eaque quos porro velit consequatur in dolorem eum tenetur aspernatur, quidem dignissimos voluptatibus odit. Iusto, suscipit aperiam."
            />
            <Message.FileAttachment
              link="#"
              label="Error Report PDF.zip"
            />
          </fieldset>
        </div>
      </div>
      <EmployeeSideBar view />
    </>
  );
};

export default TicketView;
