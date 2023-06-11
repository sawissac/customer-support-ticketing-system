import Avatar from "react-avatar";
import { AssignEmployeeListTicketProps } from "../../responseInterface/AssignEmployeeListApiResponse";
import { compareDate } from "../../commonFunction/common";
import { IconUser } from "@tabler/icons-react";
import  ProgressBar  from "@ramonak/react-progress-bar";
import { Theme } from "../../redux/variable/ThemeVariable";



export const TaskTableConfig = (employeeClickHandler: any,themeRedux:any) => [
  {
    name: "Ticket Subject",
    selector: (row: AssignEmployeeListTicketProps) => row.subject,
    sortable: true,
    width: "300px",
  },
  {
    name: "Ticket ID",
    selector: (row: AssignEmployeeListTicketProps) => row.tickets_id,
    sortable: true,
    width: "150px",
  },
  {
    name: "Admin Name",
    cell: (row: AssignEmployeeListTicketProps) => {
      return (
        <div className="avatar-profile">
          <Avatar
            className={`avatar-profile__circle`}
            name={row.admin.name}
            color={"#F37021"}
            size="30"
            textSizeRatio={2}
            round
          />
          {row.admin.name}
        </div>
      );
    },
    width: "150px",
  },
  {
    name: "Start Date",
    selector: (row: AssignEmployeeListTicketProps) => {
      return compareDate(row.start_date, row.end_date) ? "--" : row.start_date;
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Due Date",
    selector: (row: AssignEmployeeListTicketProps) => {
      return compareDate(row.start_date, row.end_date) ? "--" : row.end_date;
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Tasks Done",
    selector: (row: AssignEmployeeListTicketProps) => {
      const total = row.employee_assign.length;
      const doneEmployee = row.employee_assign.filter((employee) => {
        if (employee.status === "done") {
          return true;
        }
      });
      const calculated = (doneEmployee.length / total) * 100;
      return (
        <ProgressBar
          completed={total === 0 ? 0 : Math.round(calculated)}
          bgColor="#F37021"
          height="18px"
          animateOnRender={true}
          labelAlignment="outside"
          className="progress-wrapper"
          barContainerClassName={`${
            themeRedux === Theme.Dark
              ? "progress-container progress-container--dark"
              : "progress-container"
          }`}
          labelClassName={`${
            themeRedux === Theme.Dark
              ? "progress-label progress-label--dark"
              : "progress-label"
          }`}
        />
      );
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Status",
    cell: (row: any) => {
      const badgeColor = row.status === "open"
      ? "badge--open"
      : row.status === "close"
      ? "badge--close"
      : row.status === "processing"
      ? "badge--processing"
      : row.status === "fixed"
      ? "badge--fixed"
      : "badge--confirm";
      return <div className={`badge ${badgeColor}`}>{row.status}</div>;
    },
    sortable: true,
    width: "200px",
  },
  {
    name: "Assign",
    cell: (row: AssignEmployeeListTicketProps) => (
      <button
        title="Assigned Employee"
        className={
        "btn btn--light btn--icon btn--no-m-bottom text-primary"}
        onClick={() => {
          employeeClickHandler(row);
        }}
      >
        <IconUser size={25} />
      </button>
    ),
    button: true,
  },
];
