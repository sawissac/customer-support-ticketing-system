import { NavLink } from "react-router-dom";

interface AlertBarInterface {
  view: "admin" | "employee" | "customer";
  state: "open" | "processing" | "fixed" | "complete" | "close";
}

function AlertBar({ view, state }: AlertBarInterface) {
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
      {state === "complete" &&
        view === "customer" &&
        "Your ticket has been complete, Please check your app and confirm, So the staff can know you are satisfy. "}

      {(view === "admin" || view === "employee") && (
        <NavLink
          to={`/${view}-dashboard/employee-assignment`}
          className="btn btn--outline btn--no-m-bottom"
        >
          Go to Assign
        </NavLink>
      )}
    </div>
  );
}

export default AlertBar;
