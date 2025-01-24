import React from 'react';

const Contact = () => {
  return (
    <div id="contact" className="bg-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-black">Contact Us</h2>
        <p className="text-gray-700 text-lg mb-6">Have questions? Get in touch with us.</p>
        <form className="w-full md:w-1/2 mx-auto">
          <div className="mb-4">
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Name" />
          </div>
          <div className="mb-4">
            <input type="email" className="w-full p-2 border rounded-lg" placeholder="Email" />
          </div>
          <div className="mb-4">
            <textarea className="w-full p-2 border rounded-lg" rows="5" placeholder="Message"></textarea>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-600">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
