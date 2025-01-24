import React from 'react';
import heroImage from '../images/logo1.jpeg';

const Hero = () => {
  return (
    <div className="bg-gray-100 text-gray-800 py-20 md:py-32">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-8">
        <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Analyze Sentiments Effortlessly</h1>
          <p className="text-lg md:text-2xl mb-6">Use our advanced sentiment analysis tool to understand the emotions behind any text.</p>
          <a href="/login" className="bg-blue-600 text-white px-8 py-3 md:px-10 md:py-4 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            Get Started
          </a>
        </div>
        <div className="md:w-1/2">
          <img src={heroImage} alt="Hero" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
