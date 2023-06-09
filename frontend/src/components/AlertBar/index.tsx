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
  state: "open" | "processing" | "fixed" | "confirm" | "unconfirm" | "close";
}

function AlertBar({ view, state }: AlertBarInterface) {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const ticketRedux = useAppSelector((state) => state.ticket);
  const [modelOpen, setModalOpen] = React.useState(false);
  const [unmodelOpen, setUnModalOpen] = React.useState(false);
  return (
    <div className="alert-bar">
      {state === "open" &&
        view === "customer" &&
        "Your ticket has been open, wait for the staff to take action."}
      {state === "open" &&
        view === "admin" &&
        "The customer ticket has been open please assign employee."}

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
        "Your ticket has been resolved,Please check your app and confirm,So the staff can know you are satisfy. "}
      {state === "fixed" &&
        view === "admin" &&
        "Please wait for the customer to confirm his or her app."}
      {state === "fixed" &&
        view === "employee" &&
        "Ticket has been fixed please wait confirmation from customer."}

      {state === "confirm" &&
        view === "customer" &&
        "Your ticket has been completed. Now you can leave."}
      {state === "confirm" &&
        view === "admin" &&
        "Ticket has been confirmed by customer.Now you can close ticket"}
      {state === "confirm" &&
        view === "employee" &&
        "Ticket has been confirmed by customer.Now you can leave."}

      {state === "unconfirm" &&
        view === "customer" &&
        "Ticket is Uncomfirmed.Please edit ticket subject and we will fixing again"}
      {state === "unconfirm" && view === "admin" && "Customer is Uncomfirmed."}
      {state === "unconfirm" &&
        view === "employee" &&
        "Ticket is Uncomfirmed. Please wait for Admin to assign a response!"}

      {state === "close" &&
        view === "customer" &&
        "Ticket has been closed it will remain as history!"}
      {state === "close" &&
        view === "admin" &&
        "Ticket has been closed it will remain as history!"}
      {state === "close" &&
        view === "employee" &&
        "Ticket has been closed it will remain as history!"}

      {(view === "admin" || view === "employee") && (
        <NavLink
          to={`/${view}-dashboard/tasks`}
          className="btn btn--outline btn--no-m-bottom"
        >
          Go to Tasks
        </NavLink>
      )}

      {view === "customer" && state === "fixed" && (
        <>
          <Button
            className="btn btn--outline btn--no-m-bottom"
            label="Confirm"
            onClick={() => {
              setModalOpen(true);
            }}
          />
          <Button
            className="btn btn--outline btn--no-m-bottom"
            label="Unconfirm"
            onClick={() => {
              setUnModalOpen(true);
            }}
          />
        </>
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
            We have marked your ticket as fixed. Please check your app and
            confirm the status to indicate your satisfaction.
          </div>
          <Button
            className="btn btn--primary btn--no-m-bottom"
            label="Change to Confirm Status"
            onClick={() => {
              setModalOpen(false);
              getTicket({
                id: ticketRedux.ticketId,
                token: authRedux.token,
              }).then((res: any) => {
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

      <Modal
        onClose={() => {
          setUnModalOpen(false);
        }}
        center
        open={unmodelOpen}
        animationDuration={0}
      >
        <div className="modal">
          <div className="modal__title">UnConfirmation</div>
          <div className="modal__desc">Are You sure to Unconfirm?</div>
          <Button
            className="btn btn--primary btn--no-m-bottom"
            label="Change to Unconfirm Status"
            onClick={() => {
              setUnModalOpen(false);
              getTicket({
                id: ticketRedux.ticketId,
                token: authRedux.token,
              }).then((res: any) => {
                updateTicket({
                  ...res.data,
                  ticketId: res.data.id,
                  status: "unconfirm",
                  token: authRedux.token,
                }).then(() => {
                  setUnModalOpen(false);
                  dispatch(
                    setAlert({
                      message: "Your Ticket is Uncomfirmed",
                      state: Alert.Warning,
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
