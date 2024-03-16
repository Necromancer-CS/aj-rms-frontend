import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "src/hooks/use-auth";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
}
