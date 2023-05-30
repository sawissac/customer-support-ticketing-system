import {
  IconHash,
  IconSettings,
  IconSunFilled,
  IconMoonFilled,
  IconLogout,
} from "@tabler/icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { resetAuth } from "../../redux/feature_slice/AuthSlice";
import { Theme } from "../../redux/variable/ThemeVariable";
import { darkTheme, lightTheme } from "../../redux/feature_slice/ThemeSlice";
import Avatar from "react-avatar";
import Dropdown from "../DropDown";
import Button from "../Button";
import { resetEmployeeAssignPage } from "../../redux/feature_slice/EmployeeAssignmentSlice";
import { resetEmployeeProjectPage } from "../../redux/feature_slice/EmployeeProjectSlice";
import { resetProjectPage } from "../../redux/feature_slice/ProjectPageSlice";
import { resetTicketPage } from "../../redux/feature_slice/TicketSlice";
import { resetUserPage } from "../../redux/feature_slice/UserPageSlice";

interface SideBarInterface extends SideBarList {}

export interface SideBarList {
  route: string;
  subRoutes: SideBarLink[];
  onClick?: any;
}

export interface SideBarLink {
  routeName: string;
  label?: string;
  icon?: any;
  reset?:any;
}

const SideBar = (props: SideBarInterface) => {
  const authRedux = useAppSelector((state) => state.auth);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <IconHash size={24} />
        <h5>Welcome User</h5>
      </div>
      <SideBar.List
        route={props.route}
        subRoutes={props.subRoutes}
      />
      <SideBar.Profile
        name={authRedux.user.name}
        email={authRedux.user.email}
      />
    </div>
  );
};

SideBar.List = function (props: SideBarList) {
  return (
    <div className="sidebar__list">
      <h5>Manage</h5>
      {props.subRoutes.map((subRoute, index) => {
        return (
          <SideBar.Link
            key={index}
            routeName={props.route + subRoute.routeName}
            icon={subRoute.icon}
            label={subRoute.label}
            reset={subRoute.reset}
          />
        );
      })}
    </div>
  );
};

SideBar.Link = function (props: SideBarLink) {
  const dispatch = useAppDispatch();
  return (
    <NavLink
      to={props.routeName}
      className={({ isActive }) => {
        let className = isActive ? "sidebar__list--active " : "";
        return className;
      }}
      onClick={() => {
        if(props.reset){
          dispatch(props.reset());
        }
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
  const themeRedux = useAppSelector((state) => state.theme);
  const navigate = useNavigate();
  return (
    <div className="sidebar__profile">
      <Avatar
        color="#F37021"
        name={props.name}
        size="40"
        textSizeRatio={1.75}
        round
      />
      <div>
        <h5>{props.name.length > 10 ? props.name.substring(0, 10) + "..." : props.name}</h5>
        <h6>{props.email.length > 15 ? props.email.substring(0, 15) + "..." : props.email}</h6>
      </div>
      <Dropdown
        offset={[0, 30]}
        placement="right-start"
        buttonChildren={<IconSettings />}
        dropdownClassName="sidebar-dropdown"
        dropdownChildren={
          <>
            <h6>Ui Mode</h6>
            <Button
              type="button"
              className={themeRedux === Theme.Dark ? "sidebar-dropdown--active" : ""}
              onClick={() => {
                dispatch(darkTheme());
              }}
              icon={
                <IconMoonFilled
                  size={20}
                  style={{ marginRight: "10px" }}
                />
              }
              label="Dark"
            />
            <Button
              type="button"
              className={themeRedux === Theme.Light ? "sidebar-dropdown--active" : ""}
              onClick={() => {
                dispatch(lightTheme());
              }}
              icon={
                <IconSunFilled
                  size={20}
                  style={{ marginRight: "10px" }}
                />
              }
              label="Light"
            />
            <h6>Account</h6>
            <Button
              type="button"
              className="text-danger"
              onClick={() => {
                dispatch(resetAuth());
                dispatch(resetEmployeeAssignPage());
                dispatch(resetEmployeeProjectPage());
                dispatch(resetProjectPage());
                dispatch(resetTicketPage());
                dispatch(resetUserPage());
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
