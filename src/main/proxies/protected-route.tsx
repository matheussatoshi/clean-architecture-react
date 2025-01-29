import { useAuthentication } from "@/data/hooks";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { urls } from "../routing";

interface ProtectedRouteProps {
  layout?: boolean;
  render: React.ReactNode;
}

export const ProtectedRoute = ({ render: Component }: ProtectedRouteProps) => {
  const { session } = useAuthentication();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null,
  );

  React.useEffect(() => {
    const checkAuth = () => {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      setIsAuthenticated(Boolean(storedRefreshToken || session));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [session]);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={urls.redirect.SIGN_IN} replace />;
  }

  return Component;
};
