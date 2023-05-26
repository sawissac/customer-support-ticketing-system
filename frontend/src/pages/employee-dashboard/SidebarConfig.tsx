import { IconCalendarEvent, IconTicket } from "@tabler/icons-react";
import { SideBarLink } from "../../components/SideBar";

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
];