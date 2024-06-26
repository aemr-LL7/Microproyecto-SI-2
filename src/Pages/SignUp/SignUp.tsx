import { useState, useEffect } from "react";
import './SignUp.css'
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { DocumentData, QuerySnapshot, addDoc, collection, getFirestore, onSnapshot } from "firebase/firestore";
import { database } from "../../FireBase/config";
import Usuarios from "../../Classes/Usuarios";
import { useAuth } from "../../Context/context";
import React from 'react'

interface videoGames {
    ID: string;
    id: string;
    titulo: string;
    genre: string;
    description: string;
}
export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState("");
    const [lastnameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<string>('');
    const [videogames, setVideogames] = useState<videoGames[]>([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, 'games'), (snapshot: QuerySnapshot<DocumentData>) => {
            try {
                const fetchedVideoGames = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as unknown));
                setVideogames(fetchedVideoGames as videoGames[]);
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


    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const selectedSupplierName = event.target.value as string;
        setSelectedSupplier(selectedSupplierName);
    };


    const onButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log("Entra")

        // Set initial error values to empty
        setEmailError("");
        setPasswordError("");

        if (!email || !password) {
            setEmailError("Email and password are required fields.");
            setPasswordError("Email and password are required fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        if (password.length < 7) {
            setPasswordError("Password must be at least 7 characters long.");
            return;
        }
        if (!name) {
            setNameError("Name is required");
            return;
        }
        if (!last_name) {
            setLastNameError("Last Name is required");
            return;
        }
        if (!selectedSupplier) {
            setLastNameError("VideoGame is required");
            return;
        }


        try {
            // Intenta registrarse
            const newUser: Usuarios = new Usuarios(name, last_name, email, password, selectedSupplier, []);


            // Agregar usuario a la colección "usuarios" en Firestore
            const db = getFirestore();
            const usersCollection = collection(db, "users");


            const userData = {
                name: newUser.getName(),
                email: newUser.getEmail(),
                password: newUser.getpassword(),
                lastname: newUser.getLastName(),
                juego: newUser.getJuego(),
                clubs: newUser.getClubs()

                // ... other fields if needed, but exclude password
            };

            await addDoc(usersCollection, userData);

            // Si el inicio de sesión es exitoso, redirige a la página de inicio

            console.log("Usuario registrado correctamente"); // Redirige a la ruta principal
            navigate('/');
            login(newUser);

        } catch (error) {
            console.error('Error trying to register: ', error);
        }
    }


    return (
        <div>

            <div className="form-container">
                <p className="title">Sign Up</p>
                <form className="form">
                    <div className="input-group">
                        <label >Name</label>
                        <input value={name} name="name" id="name" placeholder="" onChange={(ev) => setName(ev.target.value)} />
                        <label>{nameError}</label>
                    </div>
                    <div className="input-group">
                        <label >Last Name</label>
                        <input value={last_name} name="lastname" id="lastname" placeholder="" onChange={(ev) => setLastName(ev.target.value)} />
                        <label>{lastnameError}</label>
                    </div>
                    <div className="input-group">
                        <label >Email</label>
                        <input value={email} name="email" id="email" placeholder="" onChange={(ev) => setEmail(ev.target.value)} />
                        <label>{emailError}</label>
                    </div>
                    <div className="input-group">
                        <label >Password</label>
                        <input type="password" name="password" id="password" placeholder="" value={password} onChange={(ev) => setPassword(ev.target.value)} />
                        <label>{passwordError}</label>
                        <div className="forgot">
                        </div>
                    </div>

                    <div className="Suppliers-container">
                        <label >VideoGame</label>
                        <Select className="select"
                            value={selectedSupplier}
                            onChange={handleSelectChange}
                            style={{ color: "rgba(243, 244, 246, 1)" }}
                        >
                            {videogames.map((game: videoGames) => (

                                <MenuItem key={game.id} value={game.titulo}>
                                    {game.titulo}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>



                    <button className="sign" onClick={onButtonClick}>Sign Up</button>
                </form>
                <div className="social-message">
                    <div className="line"></div>
                    <p className="message">Log in with social accounts</p>
                    <div className="line"></div>
                </div>

                {/* LOG WITH SOCIAL ACCOUNTS */}
                <div className="social-icons">
                    <button aria-label="Log in with Google" className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    )
}
