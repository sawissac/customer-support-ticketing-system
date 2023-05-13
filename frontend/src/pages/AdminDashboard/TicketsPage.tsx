import React from "react";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconMessage2 } from "@tabler/icons-react";

const TicketPage = () => {
  return (
    <div className="admin-container">
      <Nav icon={<IconMessage2 />} label="Tickets" />

    </div>
  );
};

export default TicketPage;
