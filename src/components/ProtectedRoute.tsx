import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
