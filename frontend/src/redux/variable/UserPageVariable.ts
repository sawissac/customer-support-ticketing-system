export const userRoles: {
  [key: string]: string;
} = {
  Admin: "admin",
  Employee: "employee",
  Customer: "customer",
  "Resign Employee": "resign_employee",
};


export const serverRoles: {
  [key: string]: string;
} = {
  admin: "Admin",
  employee: "Employee",
  customer: "Customer",
  resign_employee: "Resign Employee",
};


export const userSidebarInit = {
  id: 0,
  name: "",
  email: "",
  role: "",
  rightSidebar: "",
  state: "",
};
