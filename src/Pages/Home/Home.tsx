// Home.tsx
import { NavBar } from '../NavBar/navBar';
import SearchBar from '../NavBar/SearchBar';
import ClubList from './HomeComponents/ClubList';

const Home: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className='Home'>
                <div className='user-welcome'>
                    <h1>Bienvenido: </h1>
                </div>

                <div className='search-bar'>
                    <h1>Nuestra colección de Videojuegos</h1>
                    <SearchBar />
                </div>

                <div className='clubs-section'>
                    <h1>Clubes Disponibles</h1>
                    <ClubList />
                </div>

            </div>
        </>

    );
}

export default Home;
