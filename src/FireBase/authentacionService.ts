import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from "./config";
import {
  AuthProvider,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { CollectionReference, DocumentData, collection, getFirestore } from "@firebase/firestore";
import { doc, getDoc, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Usuarios from "../Classes/Usuarios";

const googleProvider = new GoogleAuthProvider();

export default async function signUpWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const db = getFirestore();
    const name = result.user.displayName.split(' ');
    const userRef = doc(db, 'users', result.user.uid);
    
    await setDoc(userRef, {
      nombre: name[0],
      apellido: name[1],
      password: "",
      email: result.user.email,
      Juegopref: "",
      Clubes: []
    }, { merge: true });
     const docSnapshot = await getDoc(userRef);
     const user= new Usuarios(docSnapshot.data().nombre, docSnapshot.data().apellido, docSnapshot.data().email, docSnapshot.data().password, docSnapshot.data().Juegopref, docSnapshot.data().Clubes);
    console.log(user)
     // if (docSnapshot.exists()) {
    //   console.log("Datos guardados correctamente:");
    //   console.log("Nombre:", docSnapshot.data().nombre);
    //   console.log("Apellido:", docSnapshot.data().apellido);
    //   console.log("Email:", docSnapshot.data().email);
    //   console.log("Juego preferido:", docSnapshot.data().Juegopref);
    //   console.log("Clubes:", docSnapshot.data().Clubes);
    // } else {
    //   console.log("Error: No se pudo encontrar el documento guardado en Firestore.");
    // }

    // console.log("Datos actualizados en Firestore:", result.user);
  
    return user;
  } catch (error) {
    throw new Error(`Error al iniciar sesión con Google: ${error.message}`);
  }
}

export async function signUp(email: string, password: string) {
  console.log("Entering signUp function");

  // Basic email and password validation
  if (!email || !password) {
    throw new Error("Email and password are required fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (password.length < 7) {
    throw new Error("Password must be at least 7 characters long.");
  }

  try {
    // Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created successfully:", userCredential.user);

    // **Optional:** Add user data to Firestore (if needed)
    // Replace `agregarUsuarioFirebase` with your actual implementation
    // const firestoreResult = await agregarUsuarioFirebase({
    //   nombre: /* user's name */,
    //   apellido: /* user's last name */,
    //   correo: email,
    //   /* ... other user data */
    // });

    // Succes
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);

    return userCredential.user;
  } catch (error) {
    throw Error("Error al iniciar sesion" + error);
  }
}

export async function signInProvider(provider: AuthProvider) {
  try {
    const result = await signInWithPopup(auth, provider);
  } catch (error) {
    throw Error(
      "Error al iniciar sesion con el proveedor" + provider.providerId
    );
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    console.log("logged out")
  } catch (error) {
    throw Error("Error al cerrar sesion");
  }
}
export const agregarUsuarioFirebase = async (usuarioData: {
  nombre: string,
  apellido: string,
  correo: string,
  password: string,
  juegoPreferido: string,

}) => {
  try {
    // Accede a la colección de usuarios en Firestore
  const db = getFirestore();
  const usersCollection = collection(db, 'usuarios');

    // Agrega el usuario a la colección con el método add()
    await addDoc(usersCollection, usuarioData);

    console.log('Usuario agregado correctamente');
    return true;
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    return false;
  }
}

function addDoc(usersCollection: CollectionReference<DocumentData, DocumentData>, usuarioData: { nombre: string; apellido: string; correo: string; password: string; juegoPreferido: string; }) {
  throw new Error("Function not implemented.");
}

