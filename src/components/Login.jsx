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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side background image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right side form with gradient background */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-gradient-to-br from-blue-400 to-purple-600">
        <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={signInWithEmail}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded mb-4 transition-colors"
          >
            Sign In with Email
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded transition-colors"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
