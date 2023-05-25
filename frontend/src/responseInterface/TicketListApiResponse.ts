import { EmployeeProjectApiResponse } from "./EmployeeProjectApiResponse";
import { CustomerProjectApiResponse } from "./CustomerProjectApiResponse";
import { ProjectApiResponse } from "./ProjectApiResponse";
import { TicketApiResponse } from "./TicketApiResponse";
import { UserApiResponse } from "./UserApiResponse";
import { EmployeeAssignApiResponse } from "./EmployeeAssignApiResponse";
export interface TicketListApiResponse {
  success: boolean;
  message: string;
  data: TicketListProps[];
}
export interface TicketSingleListApiResponse {
  success: boolean;
  message: string;
  data: TicketListProps;
}

export interface TicketListProps extends TicketApiResponse {
  customer_project: CustomerProjectApiResponse & {
    user: UserApiResponse;
    project: ProjectApiResponse & {
      employee_project: EmployeeProjectApiResponse &
        {
          user: UserApiResponse;
        }[];
    };
    employee_assign: EmployeeAssignApiResponse[];
  };
}
