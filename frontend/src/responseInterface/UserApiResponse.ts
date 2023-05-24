export interface UserApiResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
}

interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  model_id: number;
  role_id: number;
  model_type: string;
}
