import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/context"; // Importa el contexto de autenticación
import Usuarios from "../../Classes/Usuarios";

const Profile: React.FC = () => {
   const { user, login, logout } = useContext(AuthContext); // Obtén el usuario y las funciones de inicio y cierre de sesión del contexto de autenticación
    // Obtén el usuario y las funciones de inicio y cierre de sesión del contexto de autenticación
  const [newName, setNewName] = useState<string>(user ? user.username : "");
  const [newEmail, setNewEmail] = useState<string>(user ? user.email : "");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para actualizar los datos del usuario
    // Pero para mantenerlo simple, podríamos simplemente mostrar la información en la consola
    console.log("Nuevo nombre:", newName);
    console.log("Nuevo email:", newEmail);
  };

 
  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={user.getName()}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={newEmail}
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default Profile;