import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side background image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          alt="Signup Background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right side form with gradient background */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-gradient-to-br from-green-400 to-teal-500">
        <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Signup</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={signUpWithEmail}
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded mb-4 transition-colors"
          >
            Sign Up with Email
          </button>
          <button
            onClick={handleGoogleSignUp}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded transition-colors"
          >
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
