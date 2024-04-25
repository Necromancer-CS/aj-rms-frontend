export type MenuStatus = "ready" | "notReady";
export type MenuType = "meat" | "seaFood" | "dessert" | "drink" | "fruit" | "snacks";

export interface TMenuItem {
  _id: string;
  packageBufferId?: string;
  packageName: string;
  menuType: MenuType;
  menuStatus: MenuStatus;
  menuPrice: string | number;
  menuName: string;
  createdAt?: string;
  updatedAt?: string;
  file: string;
  __v?: number;
}

export interface MenuStatusItem {
  title: string;
  value: MenuStatus;
}

export interface MenuTypeItem {
  title: string;
  value: MenuType;
}
