import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/sentimentAnalysis');
    } catch (error) {
      console.error('Error during email sign in:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/sentimentAnalysis');
    } catch (error) {
      console.error('Error during Google sign in:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
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
      <button onClick={signInWithEmail} className="bg-blue-500 text-white p-2 mb-2">Sign In with Email</button>
      <button onClick={handleGoogleSignIn} className="bg-red-500 text-white p-2">Sign In with Google</button>
    </div>
  );
};

export default Login;
