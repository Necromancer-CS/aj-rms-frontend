import React from "react";
import { Stack } from "@mui/material";
import AdminSideMenu from "../layout/AdminSideMenu";
import { useAuth } from "src/hooks/use-auth";

interface Props {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: Props) {
  const { user } = useAuth();

  if (!["admin", "employee", "chef"].includes(user?.role as string))
    return null;

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <AdminSideMenu />
      <Stack sx={{ width: "100%" }}>{children}</Stack>
    </Stack>
  );
}
