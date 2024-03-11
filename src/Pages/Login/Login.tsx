import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import signInWithGoogle, { signIn } from '../../FireBase/authentacionService';
import { LoginNavBar } from './LoginNavBar';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';

import VideoGames from '../../Classes/VideoGames';
import { getFirestore, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { database } from '../../FireBase/config';
import { useAuth } from '../../Context/context';
import Usuarios from '../../Classes/Usuarios';




export const Login: React.FC<object> = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	
	const signInWithGoogleHandler = async () => {
		try {
			
			// const user = await signInWithGoogle();
			const datos ={	
				name: "Jesus",
				lastname: "Alvarado",
				email: "jesus.101201@gmail.com",
				password: "",
				juego:"",
				club: []
			}
			const user= new Usuarios ( datos.name, datos.lastname, datos.email, datos.password, datos.juego, datos.club)
			

			if (user) {
				login(user);
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
				login(user); // Actualiza el estado de autenticación (isAuthenticated) y la información del usuario (user
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
				</div>

				<p className="signup">Don't have an account?
					<Link to="/signin" className=""> Sign up</Link>
				</p>
			</div>
		</div>
	)
}
