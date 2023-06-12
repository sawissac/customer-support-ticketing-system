import { IconChartBar, IconTicket } from "@tabler/icons-react";
import { SideBarLink } from "../../components/SideBar";
import { resetTicketPage} from "../../redux/feature_slice/TicketSlice";

export const sidebarConfig: SideBarLink[] = [
  {
    routeName: "/dashboard",
    icon: <IconChartBar />,
    label: "Dashboard",
    reset: resetTicketPage
  },
  {
    routeName: "/tickets",
    icon: <IconTicket />,
    label: "Tickets",
    reset: resetTicketPage
  },
  
];