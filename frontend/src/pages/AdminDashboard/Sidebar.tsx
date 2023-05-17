import {
  IconHash,
  IconMessage2Up,
  IconSettings,
  IconMessage2Plus,
  IconUsers,
  IconFileTime,
  IconCalendarPlus,
  IconSunFilled,
  IconMoonFilled,
  IconLogout,
  IconMessage2,
  IconCalendarUp,
  IconUserUp,
  IconFolderPlus,
  IconFolderUp,
  IconFolder,
  IconCalendarEvent,
  IconNotes,
  IconListDetails,
} from "@tabler/icons-react";
import Avatar from "react-avatar";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hook";
import { resetAuth } from "../../redux/feature_slice/AuthSlice";
import { IconUserPlus } from "@tabler/icons-react";
import { Theme } from "../../redux/variable/ThemeVariable";
import { Sidebar } from "../../redux/variable/SidebarVariable";
import {
  detailMode,
  simplifyMode,
} from "../../redux/feature_slice/SidebarSlice";
import {
  darkTheme,
  lightTheme,
} from "../../redux/feature_slice/ThemeSlice";

interface SideBarInterface {
  route: string;
}

const SideBar = (props: SideBarInterface) => {
  const authRedux = useAppSelector(
    (state) => state.auth
  );
  const sidebarRedux = useAppSelector(
    (state) => state.sidebar
  );

  const themeRedux  = useAppSelector(state=>state.theme);
  return (
    <div className={`sidebar ${themeRedux === Theme.Dark ? 'sidebar--dark': ''}`}>
      <div className="sidebar__header">
        <IconHash size={24} />
        <h5>Welcome User</h5>
      </div>
      {sidebarRedux.mode === Sidebar.Detail && (
        <SideBar.Detail route={props.route} />
      )}
      {sidebarRedux.mode === Sidebar.Simplify && (
        <SideBar.Simplify route={props.route} />
      )}
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
SideBar.Simplify = function (
  props: SideBarSimplify
) {
  const sidebarRedux = useAppSelector(
    (state) => state.sidebar
  );
  const themeRedux  = useAppSelector(state=>state.theme);
  return (
    <div className={`sidebar__list ${themeRedux===Theme.Dark?'sidebar__list--dark':''}`}>
      <h5>Manage</h5>
      <SideBar.Link
        routeName={props.route + "/tickets"}
        icon={<IconMessage2 />}
        check={sidebarRedux.activeRoute}
        label="Tickets"
      />
      <SideBar.Link
        routeName={props.route + "/employee-assignment"}
        icon={<IconCalendarEvent />}
        check={sidebarRedux.activeRoute}
        label="Employee Assign"
      />
      <SideBar.Link
        routeName={props.route + "/users"}
        icon={<IconUsers />}
        check={sidebarRedux.activeRoute}
        label="Users"
      />
      <SideBar.Link
        routeName={props.route + "/project"}
        icon={<IconFolder />}
        check={sidebarRedux.activeRoute}
        label="Projects"
      />
      <SideBar.Link
        routeName={
          props.route + "/employee-project"
        }
        icon={<IconFolder />}
        check={sidebarRedux.activeRoute}
        label="Employee Projects"
      />
      <SideBar.Link
        routeName={
          props.route + "/customer-project"
        }
        icon={<IconFolder />}
        check={sidebarRedux.activeRoute}
        label="Customer Projects"
      />
      <SideBar.Link
        routeName={
          props.route + "/report-history"
        }
        icon={<IconFileTime />}
        check={sidebarRedux.activeRoute}
        label="Report History"
      />
    </div>
  );
};

interface SideBarDetail {
  route: string;
}
SideBar.Detail = function (props: SideBarDetail) {
  return (
    <div className="sidebar__list">
      <h5>Ticket</h5>
      <SideBar.Link
        routeName={props.route + "/tickets"}
        icon={<IconMessage2 />}
        label="Lists"
        type="header"
      />
      <SideBar.Link
        routeName={props.route + "/ticket-view"}
        icon={<IconMessage2 />}
        label="View"
        type="mid"
      />
      <SideBar.Link
        routeName={props.route + "/ticket-create"}
        icon={<IconMessage2Plus />}
        label="Create"
        type="mid"
      />
      <SideBar.Link
        routeName={props.route + "/ticket-update"}
        icon={<IconMessage2Up />}
        label="Update"
        type="footer"
      />
      <h5>Employee Assignment</h5>
      <SideBar.Link
        routeName={props.route + "/employee-assignment"}
        icon={<IconCalendarEvent />}
        label="Lists"
        type="header"
      />
      <SideBar.Link
        routeName={props.route + "/employee-view"}
        icon={<IconCalendarEvent />}
        label="View"
        type="mid"
      />
      <SideBar.Link
        routeName={
          props.route + "/employee-create"
        }
        icon={<IconCalendarPlus />}
        label="Create"
        type="mid"
      />
      <SideBar.Link
        routeName={
          props.route + "/employee-update"
        }
        icon={<IconCalendarUp />}
        label="Update"
        type="footer"
      />
      <h5>Users</h5>
      <SideBar.Link
        routeName={props.route + "/users"}
        icon={<IconUsers />}
        label="Lists"
        type="header"
      />
      <SideBar.Link
        routeName={props.route + "/user-create"}
        icon={<IconUserPlus />}
        label="Create"
        type="mid"
      />
      <SideBar.Link
        routeName={props.route + "/user-update"}
        icon={<IconUserUp />}
        label="Update"
        type="footer"
      />
      <h5>Project</h5>
      <SideBar.Link
        routeName={props.route + "/project"}
        icon={<IconFolder />}
        label="Lists"
        type="header"
      />
      <SideBar.Link
        routeName={
          props.route + "/project-create"
        }
        icon={<IconFolderPlus />}
        label="Create"
        type="mid"
      />
      <SideBar.Link
        routeName={
          props.route + "/project-update"
        }
        icon={<IconFolderUp />}
        label="Update"
        type="footer"
      />
      <h5>Employee Project</h5>
      <SideBar.Link
        routeName={
          props.route + "/employee-project"
        }
        icon={<IconFolder />}
        label="Lists"
        type="header"
      />
      <SideBar.Link
        routeName={
          props.route + "/employee-project-create"
        }
        icon={<IconFolderPlus />}
        label="Create"
        type="mid"
      />
      <SideBar.Link
        routeName={
          props.route + "/employee-project-update"
        }
        icon={<IconFolderUp />}
        label="Update"
        type="footer"
      />
      <h5>Customer Project</h5>
      <SideBar.Link
        routeName={
          props.route + "/customer-project"
        }
        icon={<IconFolder />}
        label="Lists"
        type="header"
      />
      <SideBar.Link
        routeName={
          props.route + "/customer-project-create"
        }
        icon={<IconFolderPlus />}
        label="Create"
        type="mid"
      />
      <SideBar.Link
        routeName={
          props.route + "/customer-project-update"
        }
        icon={<IconFolderUp />}
        label="Update"
        type="footer"
      />
      <h5>History</h5>
      <SideBar.Link
        routeName={
          props.route + "/report-history"
        }
        icon={<IconFileTime />}
        label="Report History"
      />
    </div>
  );
};

interface SideBarLink {
  routeName: string;
  label?: string;
  icon?: any;
  type?: "header" | "mid" | "footer";
  check?: string;
}

SideBar.Link = function (props: SideBarLink) {
  let type = "";

  switch (props.type) {
    case "header":
      type = "sidebar__list--header";
      break;
    case "mid":
      type = "sidebar__list--mid";
      break;
    case "footer":
      type = "sidebar__list--footer";
      break;
    default:
      type = "";
  }

  return (
    <NavLink
      to={props.routeName}
      className={({ isActive }) => {
        let className = isActive
          ? "sidebar__list--active "
          : "";
        let check =
          props.check === props.routeName
            ? "sidebar__list--active "
            : "";
        return className + type + check;
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

SideBar.Profile = function (
  props: SideBarProfile
) {
  const dispatch = useAppDispatch();
  const themeRedux = useAppSelector(
    (state) => state.theme
  );
  const sidebarRedux = useAppSelector(
    (state) => state.sidebar
  );
  const navigate = useNavigate();
  return (
    <div className={`sidebar__profile ${themeRedux===Theme.Dark?'sidebar__profile--dark':''}`}>
      <Avatar
        color="#F37021"
        name={props.name}
        size="40"
        textSizeRatio={1.75}
        round
      />
      <div>
        <h5>
          {props.name.length > 10
            ? props.name.substring(0, 10) + "..."
            : props.name}
        </h5>
        <h6>
          {props.email.length > 15
            ? props.email.substring(0, 15) + "..."
            : props.email}
        </h6>
      </div>
      <Dropdown
        offset={[0, 30]}
        placement="right-start"
        buttonChildren={<IconSettings />}
        dropdownClassName={`sidebar-dropdown ${themeRedux===Theme.Dark?'sidebar-dropdown--dark':''}`}
        dropdownChildren={
          <>
            <h6>Sidebar Mode</h6>
            <Button
              type="button"
              className={
                sidebarRedux.mode ===
                Sidebar.Detail
                  ? "sidebar-dropdown--active"
                  : ""
              }
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
              className={
                sidebarRedux.mode ===
                Sidebar.Simplify
                  ? "sidebar-dropdown--active"
                  : ""
              }
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
              className={
                themeRedux === Theme.Dark
                  ? "sidebar-dropdown--active"
                  : ""
              }
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
              className={
                themeRedux === Theme.Light
                  ? "sidebar-dropdown--active"
                  : ""
              }
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
              icon={
                <IconLogout
                  style={{ marginRight: "10px" }}
                />
              }
              label="Logout"
            />
          </>
        }
      />
    </div>
  );
};

export default SideBar;
