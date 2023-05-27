import Avatar from "react-avatar";
import { compareDate } from "../../commonFunction/common";
import Button from "../../components/Button";
import { IconCalendarCheck, IconCalendarEvent, IconCalendarStats, IconCircleFilled, IconCircleHalf2, IconCircleMinus } from "@tabler/icons-react";
import { AssignTicketListEmployeeAssignProps } from "../../responseInterface/AssignTicketListApiResponse";

export const EmployeeAssignTableConfig = (
  openClickHandler: any,
  processingClickHandler: any,
  doneClickHandler: any,
  userId: number
) => [
  {
    name: "Task",
    selector: (row: AssignTicketListEmployeeAssignProps) => row.task_name,
    sortable: true,
    width: "300px",
  },
  {
    name: "Employee",
    cell: (row: AssignTicketListEmployeeAssignProps) => {
      return (
        <div className="avatar-profile">
          <Avatar
            className={`avatar-profile__circle`}
            name={row.employee.name}
            color={"#F37021"}
            size="35"
            textSizeRatio={1.75}
            round
          />
          {row.employee.name}#{row.employee.id}
        </div>
      );
    },
    width: "250px",
  },
  {
    name: "Start Date",
    selector: (row: AssignTicketListEmployeeAssignProps) => {
      return compareDate(row.start_date, row.end_date) ? "--" : row.start_date;
    },
    sortable: true,
    width: "200px",
  },
  {
    name: "Due Date",
    selector: (row: AssignTicketListEmployeeAssignProps) => {
      return compareDate(row.start_date, row.end_date) ? "--" : row.end_date;
    },
    sortable: true,
    width: "200px",
  },
  {
    name: "Status",
    cell: (row: any) => {
      const color =
        row.status === "open"
          ? "badge--open"
          : row.status === "processing"
          ? "badge--processing"
          : row.status === "done"
          ? "badge--done"
          : "";
      return <div className={`badge ${color}`}>{row.status}</div>;
    },
    sortable: true,
    width: "200px",
  },
  {
    name: "Status",
    cell: (row: AssignTicketListEmployeeAssignProps) => {
      return (
        <div className="status-btn-group">
          <Button
            icon={<IconCircleMinus />}
            label=""
            title="still open"
            onClick={() => {
              if (row.employee_id === userId) openClickHandler(row);
            }}
            className={row.status === "open" ? "status-btn-group--active" : ""}
          />
          <Button
            icon={<IconCircleHalf2 />}
            label=""
            title="processing"
            onClick={() => {
              if (row.employee_id === userId) processingClickHandler(row);
            }}
            className={row.status === "processing" ? "status-btn-group--active" : ""}
          />
          <Button
            icon={<IconCircleFilled />}
            label=""
            title="done"
            onClick={() => {
              if (row.employee_id === userId) doneClickHandler(row);
            }}
            className={row.status === "done" ? "status-btn-group--active" : ""}
          />
        </div>
      );
    },
    width: "200px",
  },
];
