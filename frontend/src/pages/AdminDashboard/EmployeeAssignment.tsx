import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconMessage2 } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setActiveRoute } from "../../redux/feature_slice/SidebarSlice";
import RouteSetter from "./RouteSetter";
import { Theme } from "../../redux/variable/ThemeVariable";

const EmployeeAssignment = () => {
  const themeRedux = useAppSelector((state) => state.theme);
  return (
    <div  className={`admin-container ${
      themeRedux === Theme.Dark ? "admin-container--dark" : ""
    }`}>
      <RouteSetter routeName="/admin-dashboard/employee-assignment" />
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
            day="9days"
            projectName="sub sub"
            description="the page is loading slower..!"
            name="Momo sama"
            priority="critical"
            status="open"
            links="/admin-dashboard/employee-view"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAssignment;
