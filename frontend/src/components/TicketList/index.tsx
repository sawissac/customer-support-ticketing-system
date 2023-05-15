import {
  IconBuildingSkyscraper,
  IconClockHour3,
  IconFlag3Filled,
  IconStarsFilled,
  IconUser,
} from "@tabler/icons-react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import Button from "../Button";
import { useAppDispatch } from "../../redux/hook";
import { setActiveRoute } from "../../redux/feature_slice/SidebarSlice";

interface TicketListInterface {
  description: string;
  name: string;
  company: string;
  priority: string;
  status: string;
  day: string;
  links: string;
}

const TicketList = ({
  description,
  name,
  company,
  priority,
  status,
  day,
  links,
}: TicketListInterface) => {
  return (
    <div className="ticket-list">
      <div className="ticket-list__desc">
        {description}
      </div>
      <div className="ticket-list__status">
        <div className="ticket-list__info">
          <IconUser
            size={20}
            className="text-primary"
          />
          <label>{name}</label>
        </div>
        <div className="ticket-list__info">
          <IconBuildingSkyscraper
            size={20}
            className="text-primary"
          />
          <label>{company}</label>
        </div>
        <div className="ticket-list__info">
          <IconStarsFilled
            size={20}
            className="text-primary"
          />
          <label>{priority}</label>
        </div>
        <div className="ticket-list__info">
          <IconFlag3Filled
            size={20}
            className="text-primary"
          />
          <label>{status}</label>
        </div>
        <div className="ticket-list__info">
          <IconClockHour3
            size={20}
            className="text-primary"
          />
          <label>{day}</label>
        </div>
      </div>

      <NavLink
        to={links}
        className="btn btn--light btn--block btn--no-m-bottom"
      >
        View
      </NavLink>
    </div>
  );
};
export default TicketList;
