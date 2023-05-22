import {
  IconHash,
  IconSettings,
  IconUsers,
  IconFileTime,
  IconSunFilled,
  IconMoonFilled,
  IconLogout,
  IconMessage2,
  IconFolder,
  IconCalendarEvent,
  IconNotes,
  IconListDetails,
  IconChartBar,
} from "@tabler/icons-react";
import Avatar from "react-avatar";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { resetAuth } from "../../redux/feature_slice/AuthSlice";
import { Theme } from "../../redux/variable/ThemeVariable";
import { Sidebar } from "../../redux/variable/SidebarVariable";
import { detailMode, simplifyMode } from "../../redux/feature_slice/SidebarSlice";
import { darkTheme, lightTheme } from "../../redux/feature_slice/ThemeSlice";

interface SideBarInterface {
  route: string;
}

const SideBar = (props: SideBarInterface) => {
  const authRedux = useAppSelector((state) => state.auth);
  const sidebarRedux = useAppSelector((state) => state.sidebar);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <IconHash size={24} />
        <h5>Welcome User</h5>
      </div>
      {sidebarRedux.mode === Sidebar.Detail && "still in beta"}
      {sidebarRedux.mode === Sidebar.Simplify && <SideBar.Simplify route={props.route} />}
      <SideBar.Profile
        name={authRedux.user.name}
        email={authRedux.user.email}
      />
    </div>
  );
};

interface SideBarSimplify {
  route: string;
}
SideBar.Simplify = function (props: SideBarSimplify) {
  return (
    <div className="sidebar__list">
      <h5>Manage</h5>
      <SideBar.Link
        routeName={props.route + "/tickets"}
        icon={<IconMessage2 />}
        label="Tickets"
      />
      <SideBar.Link
        routeName={props.route + "/employee-assignment"}
        icon={<IconCalendarEvent />}
        label="Tasks"
      />
      <SideBar.Link
        routeName={props.route + "/users"}
        icon={<IconUsers />}
        label="Users"
      />
      <SideBar.Link
        routeName={props.route + "/project"}
        icon={<IconFolder />}
        label="Projects"
      />
      <SideBar.Link
        routeName={props.route + "/report-history"}
        icon={<IconChartBar />}
        label="Reports"
      />
    </div>
  );
};

interface SideBarLink {
  routeName: string;
  label?: string;
  icon?: any;
  type?: "header" | "mid" | "footer";
}

SideBar.Link = function (props: SideBarLink) {
  return (
    <NavLink
      to={props.routeName}
      className={({ isActive }) => {
        let className = isActive ? "sidebar__list--active " : "";
        return className;
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
  const sidebarRedux = useAppSelector((state) => state.sidebar);
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
            <h6>Sidebar Mode</h6>
            <Button
              type="button"
              className={sidebarRedux.mode === Sidebar.Detail ? "sidebar-dropdown--active" : ""}
              onClick={() => {
                dispatch(detailMode());
              }}
              icon={
                <IconNotes
                  size={20}
                  style={{ marginRight: "10px" }}
                />
              }
              label="Detail"
            />
            <Button
              type="button"
              className={sidebarRedux.mode === Sidebar.Simplify ? "sidebar-dropdown--active" : ""}
              onClick={() => {
                dispatch(simplifyMode());
              }}
              icon={
                <IconListDetails
                  size={20}
                  style={{ marginRight: "10px" }}
                />
              }
              label="Simplify"
            />
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
