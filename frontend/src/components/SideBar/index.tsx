import {
  IconHash,
  IconMessage2Up,
  IconSettings,
  IconMessage2Plus,
  IconUsers,
  IconBrandVisualStudio,
  IconFileTime,
  IconCalendarPlus,
  IconSunFilled,
  IconMoonFilled,
  IconLogout,
} from "@tabler/icons-react";
import Avatar from "react-avatar";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "../DropDown";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { resetAuth } from "../../redux/feature_slice/AuthSlice";

interface SideBarInterface {
  route: string;
}

const SideBar = (props: SideBarInterface) => {
  const authRedux = useAppSelector((state) => state.auth);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <IconHash size={24} />
        <h5>Welcome User</h5>
      </div>
      <div className="sidebar__list">
        <h5>Ticket</h5>
        <SideBar.Link routeName={props.route + "/client-request"} icon={<IconMessage2Up />} label="Client Request" />
        <SideBar.Link routeName={props.route + "/new-request"} icon={<IconMessage2Plus />} label="New Request" />
        <h5>Manage</h5>
        <SideBar.Link routeName={props.route + "/users"} icon={<IconUsers />} label="Users" />
        <SideBar.Link routeName={props.route + "/software"} icon={<IconBrandVisualStudio />} label="Software" />
        <SideBar.Link routeName={props.route + "/report-history"} icon={<IconFileTime />} label="Report History" />
        <SideBar.Link routeName={props.route + "/assign-dev"} icon={<IconCalendarPlus />} label="Assign Dev" />
      </div>
      <SideBar.Profile name={authRedux.user.name} email={authRedux.user.email} />
    </div>
  );
};

interface SideBarLink {
  routeName: string;
  label: string;
  icon: any;
}

SideBar.Link = function (props: SideBarLink) {
  return (
    <NavLink
      to={props.routeName}
      className={({ isActive }) => {
        return isActive ? "sidebar__list--active" : "";
      }}
    >
      {props.icon}
      <span>{props.label}</span>
    </NavLink>
  );
};

interface SideBarProfile {
  name: string;
  email: string;
}

SideBar.Profile = function (props: SideBarProfile) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="sidebar__profile">
      <Avatar color="#F37021" name={props.name} size="40" textSizeRatio={1.75} round={"7px"} />
      <div>
        <h5>{props.name.length > 10 ? props.name.substring(0, 10) + "..." : props.name}</h5>
        <h6>{props.email.length > 15 ? props.email.substring(0, 15) + "..." : props.email}</h6>
      </div>
      <Dropdown
        offset={[-200, 10]}
        placement="top-start"
        buttonChildren={<IconSettings />}
        dropdownClassName="sidebar-dropdown"
        dropdownChildren={
          <>
            <h6>Ui Mode</h6>
            <Button
              type="button"
              onClick={() => {
                dispatch(resetAuth());
                navigate("/login");
              }}
              icon={<IconMoonFilled size={20}  style={{ marginRight: "10px" }} />}
              label="Dark Mode"
            />
            <Button
              type="button"
              onClick={() => {
                dispatch(resetAuth());
                navigate("/login");
              }}
              icon={<IconSunFilled  size={20} style={{ marginRight: "10px" }} />}
              label="Light Mode"
            />
            <h6>Account</h6>
            <Button
              type="button"
              className="text-danger"
              onClick={() => {
                dispatch(resetAuth());
                navigate("/login");
              }}
              icon={<IconLogout style={{ marginRight: "10px" }} />}
              label="Logout"
            />
          </>
        }
      />
    </div>
  );
};

export default SideBar;
