import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from "./config";
import {
  AuthProvider,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

export async function signUp(email: string, password: string) {
  console.log("entro")
  try {
    const userCrendial = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCrendial.user;
  } catch (error) {
    console.log(error);
    throw Error("Error al crear el usuario");
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
