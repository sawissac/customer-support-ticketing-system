import { IconTicket } from "@tabler/icons-react";
import { SideBarLink } from "../../components/SideBar";
import { resetTicketPage, setTicketView } from "../../redux/feature_slice/TicketSlice";

export const sidebarConfig: SideBarLink[] = [
  {
    routeName: "/tickets",
    icon: <IconTicket />,
    label: "Tickets",
    reset: resetTicketPage
  },
];