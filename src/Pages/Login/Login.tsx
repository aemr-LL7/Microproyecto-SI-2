import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { signIn, signInWithGoogle } from '../../FireBase/authentacionService';
import { LoginNavBar } from './LoginNavBar';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';

import VideoGames from '../../Classes/VideoGames';
import { getFirestore, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {database} from '../../FireBase/config';



interface Supplier {
    id: number;
    name: string;
    address: string;
}
export const Login: React.FC<object> = () => {
	const navigate = useNavigate();
	const [videogames, setVideogames] = useState<VideoGames[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [selectedSupplier, setSelectedSupplier] = useState<string>('');
	const [name, setName] = useState("");
	const [last_name, setLastName] = useState("");
	const [nameError, setNameError] = useState("");
	const [lastnameError, setLastNameError] = useState("");
	useEffect(() => {
			const unsubscribe = onSnapshot(collection(database, 'games'), (snapshot: QuerySnapshot<DocumentData>) => {
            try {
                const fetchedVideoGames = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as unknown as VideoGames));
                setVideogames(fetchedVideoGames);
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
	const signInWithGoogleHandler = async () => {
		try {
			const user = await signInWithGoogle();

			if (user) {
				navigate('/');
			}
		} catch (error) {
			console.error('Error logging in with Google:', error);
		}
	};

	const onButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

		event.preventDefault();
		console.log("Entra")
		// Set initial error values to empty

		setEmailError("");
		setPasswordError("");

		// Check if the user has entered both fields correctly
		if ("" === email) {
			setEmailError("Please enter your email");
			return;
		}

		if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			setEmailError("Please enter a valid email");
			return;
		}

		if ("" === password) {
			setPasswordError("Please enter a password");
			return;
		}

		if (password.length < 7) {
			setPasswordError("The password must be 8 characters or longer");
			return;
		}
		try {
			// Intenta iniciar sesión
			const user = await signIn(email, password);

			// Si el inicio de sesión es exitoso, redirige a la página de inicio
			if (user) {
				navigate('/'); // Redirige a la ruta principal
			}
		} catch (error) {
			console.error('Error logging in:', error);
		}
	}
	return (
		<div>
			<LoginNavBar />
			<div className="form-container">
				<p className="title">Login</p>
				<form className="form">
					<div className="input-group">
						<label >Name</label>
						<input value={name} name="name" id="name" placeholder="" onChange={(ev) => setName(ev.target.value)} />
						<label>{nameError}</label>
					</div>
					<div className="input-group">
						<label >LastName</label>
						<input value={last_name} name="lastname" id="lastname" placeholder="" onChange={(ev) => setLastName(ev.target.value)} />
						<label>{lastnameError}</label>
					</div>
					<div className="input-group">
						<label >Email</label>
						<input value={email} name="username" id="username" placeholder="" onChange={(ev) => setEmail(ev.target.value)} />
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

					<button className="sign" onClick={onButtonClick}>Sign in</button>
				</form>
				<div className="social-message">
					<div className="line"></div>
					<p className="message">Login with social accounts</p>
					<div className="line"></div>
				</div>
				<div className="social-icons">
					<button aria-label="Log in with Google" className="icon" onClick={signInWithGoogleHandler}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
							<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
						</svg>
					</button>
					
				</div>
				<p className="signup">Don't have an account?
					<Link to="/signin" className=""> Sign up</Link>
				</p>
			</div>
		</div>
	)
}
