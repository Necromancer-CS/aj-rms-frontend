export interface UserTheme {
  id: string;
  avatar?: string;
  email?: string;
  name?: string;
  fullName?: string;
  role?: string;
  username?: string;
  [key: string]: any;
}

export type RoleAccessType = "employee" | "chef" | "admin";

export interface User {
  fullName: string;
  role: string;
  username: string;
  _id: string;
}
