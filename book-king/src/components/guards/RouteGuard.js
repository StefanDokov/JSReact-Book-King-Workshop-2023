import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const RouteGuard = () => {
   const {isAuthenticated} = useContext(AuthContext);

   if (!isAuthenticated) {
    return <Navigate to="/404" />;
   }

   return <Outlet />

};