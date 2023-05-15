import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconMessage2 } from "@tabler/icons-react";
import { useAppDispatch } from "../../redux/hook";
import { setActiveRoute } from "../../redux/feature_slice/SidebarSlice";
import RouteSetter from "./RouteSetter";

const TicketPage = () => {
  return (
    <div className="admin-container">
      <RouteSetter routeName="/admin-dashboard/tickets" />
      <Nav
        icon={<IconMessage2 />}
        label="Tickets"
        rightPlacer={
          <NavLink
            to={"/admin-dashboard/ticket-create"}
            className="btn btn--primary btn--block btn--no-m-bottom"
          >
            Create
          </NavLink>
        }
      />
      <div className="admin-container__inner row row--gap-1">
        <div className="col-4 col-sm-12 col-md-6">
          <TicketList
            company="ace"
            day="9days"
            description="the page is loading slower..!"
            name="Momo sama"
            priority="critical"
            status="open"
            links="/admin-dashboard/ticket-view"
          />
        </div>
        <div className="col-4 col-sm-12 col-md-6">
          <TicketList
            company="ace"
            day="9days"
            description="the page is loading slower..!"
            name="Momo sama"
            priority="critical"
            status="open"
            links="/admin-dashboard/ticket-view"
          />
        </div>
        <div className="col-4 col-sm-12 col-md-6">
          <TicketList
            company="ace"
            day="9days"
            description="the page is loading slower..!"
            name="Momo sama"
            priority="critical"
            status="open"
            links="/admin-dashboard/ticket-view"
          />
        </div>
        <div className="col-4 col-sm-12 col-md-6">
          <TicketList
            company="ace"
            day="9days"
            description="the page is loading slower..!"
            name="Momo sama"
            priority="critical"
            status="open"
            links="/admin-dashboard/ticket-view"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
