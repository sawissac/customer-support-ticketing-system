import { IconCalendarEvent, IconChartBar, IconTicket, IconUsers } from "@tabler/icons-react";
import { SideBarLink } from "../../components/SideBar";
import { IconFolder } from "@tabler/icons-react";
import { resetTicketPage, setTicketView } from "../../redux/feature_slice/TicketSlice";
import { resetEmployeeAssignPage, setTaskView } from "../../redux/feature_slice/EmployeeAssignmentSlice";
import { resetProjectPage, setProjectView } from "../../redux/feature_slice/ProjectPageSlice";
import { resetUserPage } from "../../redux/feature_slice/UserPageSlice";


export const sidebarConfig: SideBarLink[] = [
  {
    routeName: "/tickets",
    icon: <IconTicket />,
    label: "Tickets",
    reset: resetTicketPage
  },
  {
    routeName: "/tasks",
    icon: <IconCalendarEvent />,
    label: "Tasks",
    reset: resetEmployeeAssignPage
  },
  {
    routeName: "/users",
    icon: <IconUsers />,
    label: "Users",
    reset: resetUserPage
  },
  {
    routeName: "/projects",
    icon: <IconFolder />,
    label: "Projects",
    reset: resetProjectPage
  },
  {
    routeName: "/reports",
    icon: <IconChartBar />,
    label: "Reports",
  },
];