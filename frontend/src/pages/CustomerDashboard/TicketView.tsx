import React, { useState } from "react";
import Nav from "../../components/Nav";
import { IconMessage2 } from "@tabler/icons-react";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import Message from "../../components/Message";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";

const TicketView = () => {
  const dispatch = useAppDispatch();
  const ticketRedux = useAppSelector(state=>state.ticket);
  return (
    <>
      <div className="admin-container">
        <Nav.BackButton
          label={ticketRedux.subject}
          onClick={() => {
            dispatch(setTicketView({ name: "" }));
          }}
        />
        <div className="admin-container__inner">
          <fieldset className="fieldset-timer">
            <legend className="legend-timer">{ticketRedux.time}</legend>
            <Message
              userName={ticketRedux.userName}
              description={ticketRedux.description}
            />
            <Message.FileAttachment
              link={ticketRedux.driveLink}
              label="Error Report Drive Link"
            />
          </fieldset>
        </div>
      </div>
      {/* <EmployeeSideBar view=/> */}
    </>
  );
};

export default TicketView;
