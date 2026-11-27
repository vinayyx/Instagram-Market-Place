
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { loading, isAuthenticated, role } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101110]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D0FF71] border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={role === "brand" ? "/brand" : "/creator"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
