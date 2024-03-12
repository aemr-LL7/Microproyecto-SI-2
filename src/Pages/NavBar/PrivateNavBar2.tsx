import React from "react";
import { useAuth } from "../../Context/context";


interface PrivateRoute2Props {
  children: React.ReactNode;
}

const PrivateRoute2: React.FC<PrivateRoute2Props> = ({ children }) => {
  const { user, isLoadingUser } = useAuth(); // Supongamos que useAuth devuelve información sobre el usuario y si se está cargando
 
  return <>{user ? null : children}</>;
};

export default PrivateRoute2;