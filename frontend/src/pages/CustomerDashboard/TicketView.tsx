import Nav from "../../components/Nav";
import Message from "../../components/Message";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";
import Button from "../../components/Button";

const TicketView = () => {
  const dispatch = useAppDispatch();
  const ticketRedux = useAppSelector((state) => state.ticket);
  return (
    <>
      <div className="admin-container">
        <Nav.BackButton
          label={ticketRedux.subject}
          onClick={() => {
            dispatch(setTicketView({ name: "" }));
          }}
        />
        <div className="admin-container__inner">
          <fieldset className="fieldset-timer">
            <legend className="legend-timer">{ticketRedux.time}</legend>
            <div>
            </div>
            <Message
              userName={ticketRedux.userName}
              description={ticketRedux.description}
            />
            <Message.FileAttachment
              link={ticketRedux.driveLink}
              label="Error Report Drive Link"
            />
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default TicketView;
