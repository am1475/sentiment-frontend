import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo2.jpeg'; // Ensure this path points to your actual logo image

const Navbar = ({ scrollToSection, aboutRef, contactRef }) => {
  const [isOpen, setIsOpen] = useState(false);
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
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition duration-300">
            Home
          </Link>
          <span
            onClick={() => handleScroll(aboutRef)}
            className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-300"
          >
            About
          </span>
          <span
            onClick={() => handleScroll(contactRef)}
            className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Contact
          </span>
          <Link to="/login" className="text-gray-600 hover:text-blue-600 transition duration-300">
            Login
          </Link>
          <Link to="/signup" className="text-gray-600 hover:text-blue-600 transition duration-300">
            Signup
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.17 7.12 4.29A1 1 0 105.7 5.71L10.59 10.6 5.71 15.49a1 1 0 101.42 1.42L12 12.83l4.88 4.88a1 1 0 001.42-1.42L13.41 10.6l4.89-4.89z"
                />
              ) : (
                <path fillRule="evenodd" d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Home
            </Link>
            <span
              onClick={() => {
                handleScroll(aboutRef);
                setIsOpen(false);
              }}
              className="block cursor-pointer text-gray-600 hover:text-blue-600 transition duration-300"
            >
              About
            </span>
            <span
              onClick={() => {
                handleScroll(contactRef);
                setIsOpen(false);
              }}
              className="block cursor-pointer text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Contact
            </span>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
