
import  { useContext, useEffect, useState } from 'react';
import { collection, DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { NavBar } from '../NavBar/navBar';
import React from 'react'
import SearchBar from '../NavBar/SearchBar';
import { AuthContext } from '../../Context/context';
import { clubsCollection, database } from "../../FireBase/config";
import './edit.css';
import { useNavigate } from 'react-router-dom';
import { set } from 'firebase/database';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Usuarios from '../../Classes/Usuarios';

interface Club {
    id: string;
    ID: string;
    descripcion: string;
    nombre: string;
    videojuegos: string[];
  }
  interface VideoGames{
    id:string;
    ID: string;
    titulo: string ;

  }

const Editprofile: React.FC = () => {
    const navigate = useNavigate();
    const { user } =useContext(AuthContext);
    const [newName, setNewName] = useState<string>(user ? user.name : "");
    const [newLastName, setNewLastName] = useState<string>(user ? user.lastname : "");
    const [newEmail, setNewEmail] = useState<string>(user ? user.email : "");
    const [newClubs, setNewClubs] = useState<string>("");
    const [selectedSupplierName2, setSelectedSupplier2] = useState<string>('');
console.log(user);

    const [selectedSupplier, setSelectedSupplier] = useState<string>('');
    const [videogames, setVideogames] = useState<VideoGames[]>([]);
	useEffect(() => {
		const unsubscribe = onSnapshot(collection(database, 'games'), (snapshot: QuerySnapshot<DocumentData>) => {
			try {
				const fetchedVideoGames = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				} as unknown as VideoGames));
				setVideogames(fetchedVideoGames);
			
			} catch (error) {
			
				console.error('Error al cargar los datos:', error);
			}
		});

		return () => unsubscribe();
	}, []);


	const handleSelectChange = (event: SelectChangeEvent<string>) => {
		const selectedSupplierName = event.target.value as string;
		setSelectedSupplier(selectedSupplierName);
        user.setJuego(selectedSupplierName);
	};
    const handleSelectChange2 = (event: SelectChangeEvent<string>) => {
		const setSelectedSupplier23= event.target.value as string;
		setSelectedSupplier2(setSelectedSupplier23);
        user.setJuego(selectedSupplierName2);
	};

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setNewName(e.target.value); 
        user.setName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewLastName(e.target.value);
        user.setLastName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
        user.setEmail(e.target.value);
    };
    const handleClubsChange = (event: SelectChangeEvent<string>) => {
		try{
         const selectedClubName = event.target.value as string;
         setNewClubs(selectedClubName);
         user.eliminarClub(selectedClubName);
    
        }
        catch (error) {
            console.log('Error al cargar los datos:', error);
        }
}
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const unsubscribe = onSnapshot(clubsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
          try {
              const fetchedClubs = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
              } as Club));
             
              setClubs(fetchedClubs);
              setLoading(false);
              setError(null);
          } catch (error) {
              setLoading(false);
              setError('Error al cargar los datos');
              console.error('Error al cargar los datos:', error);
          }
      });
  
      return () => {
          console.log('Cleaning up...');
          unsubscribe();
      };
  }, [user]);

    const handleUpdateProfile = () => {
        // Aquí puedes enviar los nuevos datos al servidor para actualizar el perfil del usuario
    navigate('/profile');
    };

    return (
        <div>
            <h2>Modificar Perfil</h2>
            <div>
                <label>Nombre </label>
                <input type="text" value={newName} onChange={handleNameChange} />
            </div>
            <div>
                <label>Apellido  </label>
                <input type="text" value={newLastName} onChange={handleLastNameChange} />
            </div>
            <div>
                <label>Correo Electrónico  </label>
                <input type="email" value={newEmail} onChange={handleEmailChange} />
            </div>
           
            <button onClick={handleUpdateProfile} >Actualizar Perfil</button>
        <div className="">

        <h5>Eliminar grupo</h5>
        
            <br />   
                <Select className="select"
							value={selectedSupplierName2}
							onChange={handleClubsChange}
							style={{ color: "rgba(243, 244, 246, 1)" }}
						>
							  {clubs.map(club => (

								<MenuItem key={club.ID} value={club.nombre}>
									{club.nombre}
								</MenuItem>
							))}
						</Select>
   
     
    </div>
    <h5>Cambiar juego</h5>
    <Select className="select"
							value={selectedSupplier}
							onChange={handleSelectChange}
							style={{ color: "rgba(243, 244, 246, 1)" }}
						>
							{videogames.map((game) => (

								<MenuItem key={game.ID} value={game.titulo}>
									{game.titulo}
								</MenuItem>
							))}
						</Select>
        </div>
    );
}

export default Editprofile;