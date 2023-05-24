import { UserApiResponse } from "./UserApiResponse";

export interface CustomerListApiResponse {
  success: boolean;
  message: string;
  data: UserApiResponse[]
}

