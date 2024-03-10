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
import { database } from '../../FireBase/config';



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
				<p className="title">Log In</p>
				<form className="form">
					<div className="input-group">
						<label>Username</label>
						<input value={email} name="username" id="username" placeholder="" onChange={(ev) => setEmail(ev.target.value)} />
						<label>{emailError}</label>
					</div>
					<div className="input-group">
						<label>Password</label>
						<input type="password" name="password" id="password" placeholder="" value={password} onChange={(ev) => setPassword(ev.target.value)} />
						<label>{passwordError}</label>
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
					<p className="message">Log in with social accounts</p>
					<div className="line"></div>
				</div>

				{/* LOG WITH SOCIAL ACCOUNTS */}
				<div className="social-icons">
					<button aria-label="Log in with Google" className="icon" onClick={signInWithGoogleHandler}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
							<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
						</svg>
					</button>
					<button aria-label="Log in with GitHub" className="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
							<path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
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
