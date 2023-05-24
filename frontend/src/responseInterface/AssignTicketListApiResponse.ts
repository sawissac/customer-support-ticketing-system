import { EmployeeAssignApiResponse } from "./EmployeeAssignApiResponse";
import { UserApiResponse } from "./UserApiResponse";

export interface AssignTicketListApiResponse {
  success: boolean;
  message: string;
  data: AssignTicketListEmployeeAssignProps[];
}

export interface AssignTicketListEmployeeAssignProps extends EmployeeAssignApiResponse {
  employee: UserApiResponse;
}
