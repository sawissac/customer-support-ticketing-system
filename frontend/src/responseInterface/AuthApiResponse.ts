export interface AuthApiResponse {
  status: boolean;
  message: string;
  token: string;
  role: string;
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    roles: Role[];
  };
}

interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_id: number;
    role_id: number;
    model_type: string;
  };
}
