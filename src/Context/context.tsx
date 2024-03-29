import  { createContext, useContext, useState } from 'react';
import Usuarios from '../Classes/Usuarios';
import React from 'react'

interface AuthContextType {
  isAuthenticated: boolean;
  user: Usuarios | null; // Añadimos la información del usuario
  login: (user: Usuarios) => void; // Pasamos la información del usuario al iniciar sesión
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Usuarios | null>(null); // Inicialmente no hay usuario

  const login = (loggedInUser: Usuarios) => {
    // Aquí realizarías la lógica de autenticación, como enviar credenciales al servidor
    // y actualizar isAuthenticated basado en la respuesta
    console.log("Usuario logeado")
    setIsAuthenticated(true);
    setUser(loggedInUser); // Actualizamos la información del usuario al iniciar sesión
    
  };

  const logout = () => {
    // Lógica para cerrar sesión, como eliminar tokens de sesión
    setIsAuthenticated(false);
    setUser(null); // Eliminamos la información del usuario al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
