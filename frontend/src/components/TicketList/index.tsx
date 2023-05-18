import {
  IconAlertTriangle,
  IconClockHour3,
  IconFlag3Filled,
  IconFolder,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import Avatar from "react-avatar";
import ShowIf from "../Helper";
import { useAppSelector } from "../../redux/hook";
import { Theme } from "../../redux/variable/ThemeVariable";

interface TicketListInterface {
  description: string;
  name: string;
  priority: string;
  status: string;
  day: string;
  links: string;
  userView?: boolean | undefined;
  projectName: string;
}


const TicketList = ({
  description,
  name,
  priority,
  status,
  day,
  links,
  userView,
  projectName
}: TicketListInterface) => {
  const themeRedux  = useAppSelector(state=>state.theme); 
  return (
    <div className={`ticket-list ${themeRedux === Theme.Dark ? 'ticket-list--dark': ''}`}>
      <div className="ticket-list__status ticket-list__status--mt-0">
        <div className="ticket-list__info ticket-list__info--center">
          <Avatar
            color="#0d6efd"
            name={name}
            size="30"
            textSizeRatio={1}
            round
          />
          <label>
            {name.length > 10
              ? name.substring(0, 10) + "..."
              : name}
          </label>
        </div>
        <ShowIf
          sif={!userView}
          show={
            <div className="ticket-list__info ticket-list__info--center">
              <Avatar
                color="#F37021"
                name={name}
                size="30"
                textSizeRatio={1}
                round
              />
              <label>
                {name.length > 10
                  ? name.substring(0, 10) + "..."
                  : name}
              </label>
            </div>
          }
        />
      </div>
      <div className="ticket-list__desc">
        {description}
      </div>
      <div className={`ticket-list__sub-desc ${themeRedux === Theme.Dark ? 'ticket-list__sub-desc--dark': ''}`}>
        <IconFolder size={20} />{projectName}
      </div>
      <div className="ticket-list__status">
        <div className="ticket-list__info">
          <IconFlag3Filled
            size={20}
            className="text-primary"
          />
          <label>{status}</label>
        </div>

        <div className="ticket-list__info">
          <IconAlertTriangle
            size={20}
            className="text-primary"
          />
          <label>{priority}</label>
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
