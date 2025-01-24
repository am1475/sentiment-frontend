import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCZZnz-C42JFIrhwBXVUasG-Fp21K652fg",
    authDomain: "sentiment-59313.firebaseapp.com",
    projectId: "sentiment-59313",
    storageBucket: "sentiment-59313.appspot.com",
    messagingSenderId: "575629566631",
    appId: "1:575629566631:web:d7a097b0845a9f0c8bf182"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during sign in with Google:', error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};

export { auth, signInWithGoogle, signOutUser };
