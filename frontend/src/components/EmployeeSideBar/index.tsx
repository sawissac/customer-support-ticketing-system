import { IconHash } from "@tabler/icons-react";
import Avatar from "react-avatar";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Theme } from "../../redux/variable/ThemeVariable";
import Button from "../Button";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";

interface EmployeeSideBarInterface {
  view?: boolean;
  customer?: boolean;
  employee: any[];
}

const EmployeeSideBar = ({ view, employee, customer }: EmployeeSideBarInterface) => {
  const themeRedux = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  return (
    <div className={`sidebar ${themeRedux === Theme.Dark ? "sidebar--dark" : ""}`}>
      <div className="sidebar__header">
        <IconHash size={24} />
        <h5>Developer</h5>
      </div>

      <div className="sidebar__list">
        <h5>Recent Employee</h5>
        {!customer &&
          employee.map((employee: any) => {
            return <EmployeeSideBar.Profile name={employee.name} />;
          })}
      </div>

      <div className="sidebar__action-list">
        {view && (
          <>
            <NavLink
              to={"/admin-dashboard/employee-assignment"}
              className="btn btn--primary btn--block"
            >
              Go to Assign
            </NavLink>

            <Button
              label="Edit Ticket"
              className="btn btn--light btn--block btn--no-m-bottom"
              onClick={() => {
                dispatch(setTicketView({ name: "ticket-update" }));
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface EmployeeSideBarProfile {
  name: string;
}

EmployeeSideBar.Profile = function (props: EmployeeSideBarProfile) {
  return (
    <div className="sidebar__profile-list">
      <Avatar
        color="#F37021"
        name={props.name}
        size="40"
        textSizeRatio={1.75}
        round
      />
      <h5>{props.name.length > 10 ? props.name.substring(0, 10) + "..." : props.name}</h5>
    </div>
  );
};

export default EmployeeSideBar;
