export type EmployeeRole = "employee" | "chef" | "admin";

export interface EmployeeItem {
    _id: string;
    fullName: string;
    role: string;
    username: string;
    password: string;
    updatedAt: string;
    __v: number;
}

export interface EmployeeRoleItem {
    title: string;
    value: EmployeeRole;
}
