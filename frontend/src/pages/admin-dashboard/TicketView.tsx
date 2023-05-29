import React from "react";
import Nav from "../../components/Nav";
import Message from "../../components/Message";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView, setViewData, updateTicketUrl } from "../../redux/feature_slice/TicketSlice";
import AlertBar from "../../components/AlertBar";
import Button from "../../components/Button";
import { textLimiter } from "../../commonFunction/common";
import { useState } from "react";
import {
  TicketListProps,
  TicketSingleListApiResponse,
} from "../../responseInterface/TicketListApiResponse";
import { useQuery } from "react-query";
import { requestAxiosWithToken } from "../../routes/request";
import { Oval } from "react-loader-spinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconClockHour3, IconFolder } from "@tabler/icons-react";

dayjs.extend(relativeTime);

const TicketView = () => {
  const dispatch = useAppDispatch();
  const ticketRedux = useAppSelector((state) => state.ticket);
  const authRedux = useAppSelector((state) => state.auth);
  const [ticketData, setTicketData] = useState<TicketListProps | null>(null);
  const url = `http://127.0.0.1:8000/api/ticket/${ticketRedux.ticketId}`;
  const { data, isFetching } = useQuery<TicketSingleListApiResponse>(
    ["tickets-view", `updated${Date()}`],
    requestAxiosWithToken(url, authRedux.token)
  );

  React.useEffect(() => {
    if (data) {
      const dataResponse = data;
      setTicketData(dataResponse.data);
    }
  }, [data]);

  if (isFetching || ticketData === null) {
    return (
      <div className="fetching">
        <Oval
          height={50}
          width={50}
          color="#F37021"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#c97b4b"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

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
                dispatch(
                  setViewData({
                    ticketId: ticketData.id,
                    customerProjectId: ticketData.customer_project.id,
                    customerProjectName: ticketData.customer_project.project.name,
                    subject: ticketData.subject,
                    description: ticketData.description,
                    priority: ticketData.priority,
                    driveLink: ticketData.drive_link,
                    status: ticketData.status,
                    time: dayjs(ticketData.created_at).fromNow(),
                    userName: ticketData.customer_project.user.name,
                    endDate: ticketData.end_date,
                    startDate: ticketData.start_date,
                  })
                );
                dispatch(setTicketView({ name: "ticket-update" }));
              }}
            />
          }
          label={textLimiter(20, ticketData.subject)}
          onClick={() => {
            dispatch(setTicketView({ name: "" }));
            dispatch(updateTicketUrl({ name: `updated ${Date()}` }));
          }}
        />
        <AlertBar
          view="admin"
          state={ticketData.status}
        />
        <div className="admin-container__inner">
          <fieldset className="fieldset-timer">
            <legend className="legend-timer">
              <IconFolder size={25} />
              {ticketData.customer_project.project.name} <IconClockHour3 size={25} />
              {dayjs(ticketData.created_at).fromNow()}
            </legend>
            <Message
              subject={ticketData.subject}
              userName={ticketData.customer_project.user.name}
              description={ticketData.description}
            />
            {ticketData.drive_link && (
              <Message.FileAttachment
                link={ticketData.drive_link}
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
