import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle, signOutUser } from '../firebase';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={signOutUser} className="bg-red-500 text-white p-2">Sign Out</button>
        </>
      ) : (
        <>
          <button onClick={signInWithGoogle} className="bg-blue-500 text-white p-2 mb-2">Sign In with Google</button>
          <Link to="/login" className="bg-blue-500 text-white p-2 mb-2">Login</Link>
          <Link to="/signup" className="bg-green-500 text-white p-2">Signup</Link>
        </>
      )}
    </div>
  );
};

export default Auth;
