import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

const provider = new GoogleAuthProvider();

// Login with Google (direct)
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

// Logout
export const logout = async () => {
  return await signOut(auth);
};
