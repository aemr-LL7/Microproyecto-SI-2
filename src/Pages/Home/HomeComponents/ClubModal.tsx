import React, { useEffect, useState } from 'react';
import './ClubModal.css';
import { getDocs } from 'firebase/firestore';
import { videoCollection } from '../../../FireBase/config';

interface ClubModalProps {
    isOpen: boolean;
    onClose: () => void;
    club: Club;
    onJoinClub: (clubId: string) => void;
}

interface Club {
    id: string;
    descripcion: string;
    nombre: string;
    videojuegos: string[];
}

interface Game {
    ID: string;
    titulo: string;
    genero: string;
    descripcion: string;
}

const ClubModal: React.FC<ClubModalProps> = ({ isOpen, onClose, club, onJoinClub  }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [gameNames, setGameNames] = useState<string[]>([]);

    // Join a club

    const handleJoin = () => {
        // Llama a la función proporcionada por la prop para unirse al club
        onJoinClub(club.id);
        // Cierra el modal después de unirse al club
        onClose();
      };

    // Logica open a modal
    useEffect(() => {
        setIsModalOpen(isOpen);

        const fetchGameNames = async () => {
            try {
                const gamesSnapshot = await getDocs(videoCollection);
                const gamesData = gamesSnapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() } as Game));

                const resolvedGameNames = club.videojuegos
                    .map((clubGameId) => gamesData.find((game) => game.ID === clubGameId))
                    .filter((foundGame) => foundGame?.titulo)
                    .map((foundGame) => foundGame!.titulo);

                setGameNames(resolvedGameNames);
            } catch (error) {
                console.error('Error al obtener nombres de juegos:', error);
            }
        };

        if (isOpen) {
            fetchGameNames();
        }
    }, [isOpen, club]);

    const handleClose = () => {
        setIsModalOpen(false);
        onClose();
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="club-modal">
            <div className="club-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="close-icon" onClick={handleClose}>
                    &#10006; {/* Icono de cierre estilo "X" */}
                </div>
                <h2>Detalles del club:</h2>
                <h3 className="modal-title">{club.nombre}</h3>
                <p className="modal-description">{club.descripcion}</p>
                <h3 className="modal-subtitle">Videojuegos:</h3>
                <ul className="modal-list">
                    {gameNames.map((gameName, index) => (
                        <li key={index}>{gameName}</li>
                    ))}
                </ul>
                <button className="join-button" onClick={handleJoin}>Unirse</button>
            </div>
        </div>
    );
};

export default ClubModal;