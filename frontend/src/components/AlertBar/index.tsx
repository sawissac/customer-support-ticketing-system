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
      {state === "fixed" &&
        view === "customer" &&
        "Your ticket has been complete, Please check your app and confirm, So the staff can know you are satisfy. "}
      {state === "fixed" &&
        view === "admin" &&
        "Please wait for the customer to confirm his or her app"}
      {state === "complete" &&
        view === "customer" &&
        "Your ticket has been complete, Please check your app and confirm, So the staff can know you are satisfy. "}
    </div>
  );
}

export default AlertBar;