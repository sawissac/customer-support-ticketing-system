import {
  IconBuildingSkyscraper,
  IconClockHour3,
  IconFlag3Filled,
  IconStarsFilled,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import Button from "../Button";

interface TicketListInterface {
  description: string;
  name: string;
  company: string;
  priority: string;
  status: string;
  day: string;
}

const TicketList = ({
  description,
  name,
  company,
  priority,
  status,
  day,
}: TicketListInterface) => {
  return (
    <div className="ticket-list">
      <div className="ticket-list__info">
        <div className="ticket-list__info__desc">
          <h3>{description}</h3>
        </div>
        <div className="ticket-list__info__status">
          <div>
            <IconUser size={20}/>
            <label>{name}</label>
          </div>
          <div>
            <IconBuildingSkyscraper size={20}/>
            <label>{company}</label>
          </div>
          <div>
            <IconStarsFilled size={20}/>
            <label>{priority}</label>
          </div>
          <div>
            <IconFlag3Filled size={20}/>
            <label>{status}</label>
          </div>
          <div>
            <IconClockHour3 size={20}/>
            <label>{day}</label>
          </div>
        </div>
      </div>
      <div className="ticket-list__btn">
        <Button type="button" label="view" className="btn btn--ticket-view"/>
      </div>    
    </div>
  );
};
export default TicketList;
