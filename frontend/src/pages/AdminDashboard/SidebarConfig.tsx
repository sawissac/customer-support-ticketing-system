import { IconCalendarEvent, IconChartBar, IconTicket, IconUsers } from "@tabler/icons-react";
import { SideBarLink } from "../../components/SideBar";
import { IconFolder } from "@tabler/icons-react";

export const sidebarConfig: SideBarLink[] = [
  {
    routeName: "/tickets",
    icon: <IconTicket />,
    label: "Tickets",
  },
  {
    routeName: "/tasks",
    icon: <IconCalendarEvent />,
    label: "Tasks",
  },
  {
    routeName: "/users",
    icon: <IconUsers />,
    label: "Users",
  },
  {
    routeName: "/projects",
    icon: <IconFolder />,
    label: "Projects",
  },
  {
    routeName: "/reports",
    icon: <IconChartBar />,
    label: "Reports",
  },
];