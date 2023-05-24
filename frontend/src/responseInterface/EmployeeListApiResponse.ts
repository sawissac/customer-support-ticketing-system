import { UserApiResponse } from "./UserApiResponse";

export interface EmployeeListApiResponse {
  success: boolean;
  message: string;
  data: UserApiResponse[]
}

