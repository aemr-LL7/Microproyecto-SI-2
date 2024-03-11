import React, { useEffect, useState } from 'react';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
//import { Container } from '@mui/material';
import { NavBar } from '../NavBar/navBar';
import { clubsCollection } from "../../FireBase/config";
import './Hometemplate.css';
import ClubCard from '../../Components/Cards';
import SearchBar from '../NavBar/SearchBar';

// Y luego usar este tipo al definir el estado y al mapear sobre los documentos:
interface Club {
    id: string;
    descripcion: string;
    nombre: string;
    videojuegos: string[];
}

const Home: React.FC = () => {
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

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavBar />
            <h1><br />Nos encontramos en HOME</h1>
            <h2>Probando Buscador</h2>
            <div className='DivGames'>
                <SearchBar />
            </div>

            <h2><br />Clubes disponibles</h2>
            <div className='DivClub'>

                <div className="club-list">
                    {clubs.map(club => (
                        <ClubCard key={club.id} club={club} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;