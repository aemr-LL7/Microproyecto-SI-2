import React, { useState } from 'react';
import './Cards.css';
import ClubModal from './ClubModal';

interface ClubCardProps {
    club: Club;
}
interface Club {
    id: string;
    descripcion: string;
    nombre: string;
    videojuegos: string[];
}
const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Join a club logic
    const handleJoinClub = (clubId: string) => {
        console.log(clubId);
        // Puedes obtener la informacion del usuario de tu estado o de donde lo tengas almacenado
        // Luego, utiliza la función addClub del usuario para agregar el club
        // Asegúrate de actualizar el estado del usuario después de unirse al club
    };

    return (
        <div className="card" onClick={handleCardClick}>
            <h3 className="card__title"> {club.nombre}
            </h3>
            <p className="card__content">{club.descripcion}</p>
            <div className="card__date">
                April 15, 2022
            </div>
            <div className="card__arrow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                    <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                </svg>
            </div>
            <ClubModal isOpen={isModalOpen} onClose={handleCloseModal} onJoinClub={handleJoinClub} club={club} />
        </div>

    );
}

export default ClubCard;