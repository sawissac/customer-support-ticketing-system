import {
  IconAlertTriangle,
  IconClockHour3,
  IconFlag3Filled,
  IconFolder,
  IconMessage2,
} from "@tabler/icons-react";
import Avatar from "react-avatar";
import ShowIf from "../Helper";
import { useAppSelector } from "../../redux/hook";
import { Theme } from "../../redux/variable/ThemeVariable";
import Button from "../Button";
import { textLimiter } from "../../commonFunction/common";
import { IconTicket } from "@tabler/icons-react";

interface TicketListInterface {
  description: string;
  name: string;
  ticketId: string;
  priority: string;
  status: string;
  day: string;
  userView?: boolean | undefined;
  projectId?: number;
  projectName: string;
  onClick?: any;
}

const TicketList = ({
  description,
  name,
  priority,
  status,
  day,
  onClick,
  userView,
  projectName,
  ticketId,
  projectId,
}: TicketListInterface) => {
  const themeRedux = useAppSelector((state) => state.theme);
  return (
    <div className={`ticket-list ${themeRedux === Theme.Dark ? "ticket-list--dark" : ""}`}>
      <div className="ticket-list__status ticket-list__status--mt-0">
        <div className="ticket-list__info ticket-list__info--center">
          <Avatar
            color="#0d6efd"
            name={name}
            size="30"
            textSizeRatio={1.75}
            round
          />
          <label>
            {name.length > 10 ? name.substring(0, 10) + "..." : name}
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
              <label>{textLimiter(30, name)}</label>
            </div>
          }
        />
      </div>
      <div className="ticket-list__desc">{textLimiter(20, description)}</div>
      <div
        className={`ticket-list__sub-desc ${
          themeRedux === Theme.Dark ? "ticket-list__sub-desc--dark" : ""
        }`}
      >
        <IconTicket size={25} />
        {ticketId}
      </div>
      <div
        className={`ticket-list__sub-desc ${
          themeRedux === Theme.Dark ? "ticket-list__sub-desc--dark" : ""
        }`}
      >
        <IconFolder size={25} />
        {textLimiter(20, projectName)} #{projectId}
      </div>
      <div className="ticket-list__status">
        <div className="ticket-list__info">
          <IconFlag3Filled size={20} className="text-primary" />
          <label>{status}</label>
        </div>

        <div className="ticket-list__info">
          <IconAlertTriangle size={20} className="text-primary" />
          <label>{priority}</label>
        </div>
        <div className="ticket-list__info">
          <IconClockHour3 size={20} className="text-primary" />
          <label>{day}</label>
        </div>
      </div>

      <Button
        label="View"
        onClick={onClick}
        className="btn btn--light btn--block btn--no-m-bottom"
      />
    </div>
  );
};
export default TicketList;
