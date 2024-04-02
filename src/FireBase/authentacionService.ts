import { createUserWithEmailAndPassword} from "firebase/auth/cordova";
import { auth } from "./config";
import {
  AuthProvider,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup, GoogleAuthProvider, UserCredential
} from "firebase/auth";
import { CollectionReference, DocumentData, collection, getFirestore } from "@firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Usuarios from "../Classes/Usuarios";
const googleProvider = new GoogleAuthProvider();

export default async function signUpWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const db = getFirestore();
    const name = result.user.displayName ? result.user.displayName.split(' ') : ['',''];
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
     const data = docSnapshot.data();
    if (data) {
    const user= new Usuarios(data.nombre, data.apellido, data.email, data.password, data.Juegopref, data.Clubes);
    console.log(user)
    return user;
    }

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
  
  
  } catch (error) {
    throw new Error(`Error al iniciar sesión con Google: ${(error as Error).message}`);
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

    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    // Autenticar al usuario con el correo electrónico y la contraseña
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user= new Usuarios("","",userCredential.user.email || "", "", "", []);
   
    // Obtener los datos adicionales del usuario desde la base de datos
  
    // Crear una instancia de Usuario con los datos obtenidos
    // const user = new Usuarios(name, lastname, email, password, juego, []);

    // Devolver el usuario autenticado

    return user;
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + (error as Error).message);
    return null;
  }
}
export async function signInProvider(provider: AuthProvider) {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result)
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
  console.log(usersCollection)
  console.log(usuarioData)
  throw new Error("Function not implemented.");
}

