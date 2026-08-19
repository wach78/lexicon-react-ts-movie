import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { checkAuth } from "../services/AuthService";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAuthentication = async (): Promise<void> => {
      const authenticated = await checkAuth();

      setIsAuthenticated(authenticated);
    };

    void verifyAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
