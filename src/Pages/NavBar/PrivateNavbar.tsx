import React from "react";
import { useAuth } from "../../Context/context";



interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

 
  return <>{user ? children : null}</>;
};

export default PrivateRoute;
