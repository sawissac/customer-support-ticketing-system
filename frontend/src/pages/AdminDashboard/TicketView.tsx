import Nav from "../../components/Nav";
import Message from "../../components/Message";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";
import AlertBar from "../../components/AlertBar";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";

const TicketView = () => {
  const dispatch = useAppDispatch();
  const ticketRedux = useAppSelector<any>((state) => state.ticket);
  return (
    <>
      <div className="admin-container">
        <Nav.BackButton
          label={ticketRedux.subject}
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
        <div className="admin-container__footer">
          <NavLink
            to={"/admin-dashboard/employee-assignment"}
            className="btn btn--primary btn--no-m-bottom"
          >
            Go to Assign
          </NavLink>
          <Button
            label="Edit Ticket"
            className="btn btn--light btn--no-m-bottom"
            onClick={() => {
              dispatch(setTicketView({ name: "ticket-update" }));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TicketView;
