import Nav from "../../components/Nav";
import Message from "../../components/Message";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";
import AlertBar from "../../components/AlertBar";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";
import { textLimiter } from "../../commonFunction/common";
import { useState } from "react";
import { TicketListApiResponse, TicketListProps } from "../../responseInterface/TicketListApiResponse";
import { useQuery } from "react-query";
import { requestAxiosWithToken } from "../../routes/request";

const TicketView = () => {
  const dispatch = useAppDispatch();
  const ticketRedux = useAppSelector((state) => state.ticket);
  const authRedux = useAppSelector((state) => state.auth);
  const [ticketData, setTicketData] = useState<TicketListProps | null>(null);
  const url = '';
  
  const [data, isFetching] = useQuery<TicketListApiResponse>(['ticket-view', 'get'], requestAxiosWithToken(url, authRedux.token));
  return (
    <>
      <div className="admin-container">
        <Nav
          back
          rightPlacer={
            <Button
              label="Edit Ticket"
              className="btn btn--light btn--block btn--no-m-bottom btn--sm"
              onClick={() => {
                dispatch(setTicketView({ name: "ticket-update" }));
              }}
            />
          }
          label={textLimiter(20, ticketRedux.subject)}
          onClick={() => {
            dispatch(setTicketView({ name: "" }));
          }}
        />
        <AlertBar
          view="admin"
          state={ticketRedux.status}
        />
        <div className="admin-container__inner">
          <fieldset className="fieldset-timer">
            <legend className="legend-timer">{ticketRedux.time}</legend>

            <Message
              userName={ticketRedux.userName}
              description={ticketRedux.description}
            />
            {ticketRedux.driveLink && (
              <Message.FileAttachment
                link={ticketRedux.driveLink}
                label="Error Report Drive Link"
              />
            )}
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default TicketView;
