import { IconHash } from "@tabler/icons-react";
import Avatar from "react-avatar";
import { NavLink } from "react-router-dom";

interface EmployeeSideBarInterface {
  view?: boolean;
}

const EmployeeSideBar = ({
  view,
}: EmployeeSideBarInterface) => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <IconHash size={24} />
        <h5>Developer</h5>
      </div>

      <div className="sidebar__list">
        <h5>Recent Employee</h5>
        <EmployeeSideBar.Profile name="Dev Issac" />
        <EmployeeSideBar.Profile name="Dev Issac" />
      </div>

      <div className="sidebar__action-list">
        {view && (
          <>
            <NavLink
              to={'/admin-dashboard/employee-create'}
              className="btn btn--primary btn--block"
            >
              Assign Employee
            </NavLink>
            <NavLink
              to={'/admin-dashboard/ticket-update'}
              className="btn btn--light btn--block btn--no-m-bottom"
            >
              Edit Ticket
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

interface EmployeeSideBarProfile {
  name: string;
}

EmployeeSideBar.Profile = function (
  props: EmployeeSideBarProfile
) {
  return (
    <div className="sidebar__profile-list">
      <Avatar
        color="#F37021"
        name={props.name}
        size="40"
        textSizeRatio={1.75}
        round
      />
      <h5>
        {props.name.length > 10
          ? props.name.substring(0, 10) + "..."
          : props.name}
      </h5>
    </div>
  );
};

export default EmployeeSideBar;
