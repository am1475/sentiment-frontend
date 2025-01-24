import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (error) {
      console.error('Error during email sign up:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      navigate('/login');
    } catch (error) {
      console.error('Error during Google sign up:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Signup</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border mb-2"
      />
      <button onClick={signUpWithEmail} className="bg-green-500 text-white p-2 mb-2">Sign Up with Email</button>
      <button onClick={handleGoogleSignUp} className="bg-red-500 text-white p-2">Sign Up with Google</button>
    </div>
  );
};

export default Signup;
