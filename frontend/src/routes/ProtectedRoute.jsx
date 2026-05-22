import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import FullPageSpinner from "@/components/loaders/FullPageSpinner";

export default function ProtectedRoute() {
  const { isAuthenticated, isValidating, validateSession, accessToken } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (accessToken && !isAuthenticated) {
      validateSession();
    }
  }, [accessToken, isAuthenticated, validateSession]);

  if (isValidating) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

