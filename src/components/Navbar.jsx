import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo2.jpeg'; // Ensure this path points to your actual logo image

const Navbar = ({ scrollToSection, aboutRef, contactRef }) => {
  const location = useLocation();

  const handleScroll = (sectionRef) => {
    if (location.pathname === '/') {
      scrollToSection(sectionRef);
    } else {
      window.location.href = '/';
      setTimeout(() => {
        scrollToSection(sectionRef);
      }, 100); // Small delay to ensure the page has loaded
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
          <span className="text-2xl font-bold text-black">
            Sentiment Analysis Tool
          </span>
        </div>
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition duration-300">Home</Link>
          <span onClick={() => handleScroll(aboutRef)} className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-300">About</span>
          <span onClick={() => handleScroll(contactRef)} className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-300">Contact</span>
          <Link to="/login" className="text-gray-600 hover:text-blue-600 transition duration-300">Login</Link>
          <Link to="/signup" className="text-gray-600 hover:text-blue-600 transition duration-300">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
