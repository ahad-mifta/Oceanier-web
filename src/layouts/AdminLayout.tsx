import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { session, isAdmin } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
