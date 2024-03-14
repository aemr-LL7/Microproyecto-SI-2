import React from "react";
import { useAuth } from "../../Context/context";
import Usuarios from "../../Classes/Usuarios";


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, isLoadingUser }: { user: Usuarios; isLoadingUser?: boolean } = useAuth();console.log(isLoadingUser)
 
  return <>{user ? children : null}</>;
};

export default PrivateRoute;
