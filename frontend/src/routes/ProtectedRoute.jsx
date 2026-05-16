import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";

export default function ProtectedRoute() {
  const token = useAppStore((s) => s.auth.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
