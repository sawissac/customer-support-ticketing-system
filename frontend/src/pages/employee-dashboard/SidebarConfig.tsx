import { IconCalendarEvent, IconTicket } from "@tabler/icons-react";
import { SideBarLink } from "../../components/SideBar";

export const sidebarConfig: SideBarLink[] = [
  {
    routeName: "/tickets",
    icon: <IconTicket />,
    label: "Tickets",
  },
  {
    routeName: "/employee-assignment",
    icon: <IconCalendarEvent />,
    label: "Tickets",
  },
];