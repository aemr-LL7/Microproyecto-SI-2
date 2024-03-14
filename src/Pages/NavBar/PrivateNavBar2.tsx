
import { useAuth } from "../../Context/context";
import Usuarios from "../../Classes/Usuarios";

import React from 'react'
interface PrivateRoute2Props {
  children: React.ReactNode;
}

const PrivateRoute2: React.FC<PrivateRoute2Props> = ({ children }) => {
  const { user, isLoadingUser }: { user: Usuarios; isLoadingUser?: boolean } = useAuth();console.log(isLoadingUser)
 
  return <>{user ? null : children}</>;
};

export default PrivateRoute2;