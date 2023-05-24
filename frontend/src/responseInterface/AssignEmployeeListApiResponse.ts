import { CustomerProjectApiResponse } from "./CustomerProjectApiResponse";
import { EmployeeAssignApiResponse } from "./EmployeeAssignApiResponse";
import { ProjectApiResponse } from "./ProjectApiResponse";
import { TicketApiResponse } from "./TicketApiResponse";
import { UserApiResponse } from "./UserApiResponse";

export interface AssignEmployeeListApiResponse {
  success: boolean;
  message: string;
  data: [
    {
      ticket: AssignEmployeeListTicketProps;
    }
  ];
}

export interface AssignEmployeeListTicketProps extends TicketApiResponse {
  admin: UserApiResponse;
  customer_project: CustomerProjectApiResponse & {
    user: UserApiResponse;
    project: ProjectApiResponse;
  };
  employee_assign: EmployeeAssignApiResponse[]
}
