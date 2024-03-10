import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const Profile: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [newName, setNewName] = useState<string>(user.username);
  const [newEmail, setNewEmail] = useState<string>(user.email);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para actualizar los datos del usuario
    setUser({ ...user, username: newName, email: newEmail });
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
            value={newName}
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