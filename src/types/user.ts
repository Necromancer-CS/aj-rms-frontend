export interface UserTheme {
  id: string;
  avatar?: string;
  email?: string;
  name?: string;

  [key: string]: any;
}

export type RoleAccessType = "employee" | "chef" | "admin";

export interface User {
  name: string;
  email: string;
  firstname: string;
  lastname: string;
  role: RoleAccessType;
  _id: string;
}
