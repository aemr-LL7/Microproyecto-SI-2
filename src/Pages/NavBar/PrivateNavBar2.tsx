
import { useAuth } from "../../Context/context";


import React from 'react'
interface PrivateRoute2Props {
  children: React.ReactNode;
}

const PrivateRoute2: React.FC<PrivateRoute2Props> = ({ children }) => {
  const { user } = useAuth();

 
  return <>{user ? null : children}</>;
};

export default PrivateRoute2;