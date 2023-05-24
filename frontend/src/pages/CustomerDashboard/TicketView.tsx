import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";
import Nav from "../../components/Nav";
import Message from "../../components/Message";
import AlertBar from "../../components/AlertBar";

const TicketView = () => {
  const dispatch = useAppDispatch();
  const ticketRedux = useAppSelector<any>((state) => state.ticket);
  return (
    <>
      <div className="admin-container">
        <Nav
          back
          label={ticketRedux.subject}
          onClick={() => {
            dispatch(setTicketView({ name: "" }));
          }}
        />
        <AlertBar
          view="customer"
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
