import { NavLink } from "react-router-dom";
import React from "react";
import Button from "../Button";
import Modal from "react-responsive-modal";
import { getTicket, updateTicket } from "../../requests/ticketRequest";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";

interface AlertBarInterface {
  view: "admin" | "employee" | "customer";
  state: "open" | "processing" | "fixed" | "confirm" | "close";
}

function AlertBar({ view, state }: AlertBarInterface) {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const ticketRedux = useAppSelector((state) => state.ticket);
  const [modelOpen, setModalOpen] = React.useState(false);

  return (
    <div className="alert-bar">
      {state === "open" &&
        view === "customer" &&
        "Your ticket has been open, wait for the staff to take action."}
      {state === "open" &&
        view === "admin" &&
        "The customer ticket has been open please assign employee"}
      {state === "processing" &&
        view === "customer" &&
        "Your ticket has been processing, wait for the staff to take complete."}
      {state === "processing" &&
        view === "admin" &&
        "The employee is fixing the bugs, wait for the staff to take complete."}
      {state === "processing" &&
        view === "employee" &&
        "Please fix the bugs, By completing the task that was given to you."}
      {state === "fixed" &&
        view === "customer" &&
        "Your ticket has been complete, Please check your app and confirm, So the staff can know you are satisfy. "}
      {state === "fixed" &&
        view === "admin" &&
        "Please wait for the customer to confirm his or her app"}
      {state === "confirm" &&
        view === "customer" &&
        "Your ticket has been completed. Now you can leave"}
      {state === "close" &&
        view === "customer" &&
        "This is the closed ticket it will remain as history!"}
        {state === "close" &&
        view === "admin" &&
        "This is the closed ticket it will remain as history!"}
        
      {(view === "admin" || view === "employee") && (
        <NavLink
          to={`/${view}-dashboard/tasks`}
          className="btn btn--outline btn--no-m-bottom"
        >
          Go to Tasks
        </NavLink>
      )}

      {view === "customer" && state === "fixed" && (
        <Button
          className="btn btn--outline btn--no-m-bottom"
          label="Confirm Here"
          onClick={() => {
            setModalOpen(true);
          }}
        />
      )}

      <Modal
        onClose={() => {
          setModalOpen(false);
        }}
        center
        open={modelOpen}
        animationDuration={0}
      >
        <div className="modal">
          <div className="modal__title">Confirmation</div>
          <div className="modal__desc">
            We have marked your ticket as fixed. Please check your app and confirm the status to
            indicate your satisfaction.
          </div>
          <Button
            className="btn btn--primary btn--no-m-bottom"
            label="Change to Confirm Status"
            onClick={() => {
              setModalOpen(false);
              getTicket({ id: ticketRedux.ticketId, token: authRedux.token }).then((res: any) => {
                updateTicket({
                  ...res.data,
                  ticketId: res.data.id,
                  status: "confirm",
                  token: authRedux.token,
                }).then(() => {
                  setModalOpen(false);
                  dispatch(
                    setAlert({
                      message: "Your Ticket has been completed.",
                      state: Alert.Success,
                    })
                  );
                });
              });
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default AlertBar;
