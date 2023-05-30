import { IconCalendarEvent, IconTicket } from "@tabler/icons-react";
import { SideBarLink } from "../../components/SideBar";
import { resetEmployeeAssignPage, setTaskView } from "../../redux/feature_slice/EmployeeAssignmentSlice";
import { resetTicketPage } from "../../redux/feature_slice/TicketSlice";

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
];