export interface AuthInterface {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  role: string;
  auth: boolean;
}

export const DefaultAuthState = {
  token: "",
  user: {
    id: 0,
    name: "",
    email: "",
  },
  auth: false,
  role: "",
};

export const AuthRole = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
  CUSTOMER: "customer",
  RESIGN_EMPLOYEE: 'resign_employee'
};
