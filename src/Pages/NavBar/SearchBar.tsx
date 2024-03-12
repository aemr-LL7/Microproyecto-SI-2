import React, { useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import { videoCollection } from '../../FireBase/config';

interface Game {
    ID: string;
    titulo: string;
    genero: string;
    descripcion: string;
}

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Game[]>([]);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                if (!searchTerm) {
                    setSearchResults([]);  // Si no hay término de búsqueda, establecer resultados vacíos
                    return;
                }

                const searchTermLower = searchTerm.toLowerCase();
                const gamesSnapshot = await getDocs(videoCollection);
                const gamesData = gamesSnapshot.docs.map((doc) => ({ ID: doc.id, ...doc.data() } as Game));

                const results = gamesData.filter((game) => game.titulo.toLowerCase().includes(searchTermLower));
                setSearchResults(results);
            } catch (error) {
                console.error('Error en la búsqueda:', error);
            }
        };

        // Llama a la función de búsqueda cada vez que cambia el término de búsqueda
        handleSearch();
    }, [searchTerm]); 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Busca tu juego deseado..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            {/* <ul>
                {searchResults.map((game) => (
                    <li key={game.ID}>{game.titulo}</li>
                ))}
            </ul> */}
            <div className='results-list'>
                {searchResults.map((game)=>{return <div key={game.ID}> {game.titulo} </div>;})}
            </div>

        </div> 
    );
};

export default SearchBar;
