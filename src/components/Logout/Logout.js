import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";

export const Logout = () => {
  const {onLogout} = useContext(AuthContext);
  
  useEffect(() => {
    onLogout();
  },[onLogout]);
  
return (
   <Navigate to="/" />
);

   
};