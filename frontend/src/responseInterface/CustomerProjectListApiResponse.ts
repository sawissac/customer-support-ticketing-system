import { CustomerProjectApiResponse } from "./CustomerProjectApiResponse";
import { ProjectApiResponse } from "./ProjectApiResponse";
import { TicketApiResponse } from "./TicketApiResponse";
import { UserApiResponse } from "./UserApiResponse";

export interface CustomerProjectListApiResponse extends CustomerProjectApiResponse {
  success: boolean;
  message: string;
  data: CustomerProjectListProps[];
}

export interface CustomerProjectListProps extends CustomerProjectApiResponse {
  user: UserApiResponse;
  project: ProjectApiResponse;
  ticket: TicketApiResponse[];
}
