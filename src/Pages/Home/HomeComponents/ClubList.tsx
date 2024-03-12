// ClubList.tsx
import React, { useEffect, useState } from 'react';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import ClubCard from './Cards';
import { clubsCollection } from '../../../FireBase/config';
import './ClubList.css';

interface Club {
  id: string;
  descripcion: string;
  nombre: string;
  videojuegos: string[];
}

const ClubList: React.FC = () => {
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
    <div className='DivClub'>
      <div className="club-list">
        {clubs.map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubList;
