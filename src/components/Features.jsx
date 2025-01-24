// src/components/Features.js
import React from 'react';
import featureImage1 from '../images/logo2.jpeg';
import featureImage2 from '../images/logo3.jpeg';
import featureImage3 from '../images/logo4.png';

const Features = () => {
  return (
    <div id="features" className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-black">Features</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <img src={featureImage1} alt="Feature 1" className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-2xl font-semibold mb-2">Accurate Analysis</h3>
            <p className="text-gray-700">Our tool provides accurate sentiment analysis using state-of-the-art machine learning models.</p>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <img src={featureImage2} alt="Feature 2" className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-2xl font-semibold mb-2">User-Friendly</h3>
            <p className="text-gray-700">Easy to use interface that allows you to analyze sentiments with just a few clicks.</p>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <img src={featureImage3} alt="Feature 3" className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-2xl font-semibold mb-2">Fast Results</h3>
            <p className="text-gray-700">Get results in seconds, allowing you to quickly understand the sentiment of any text.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Features;
