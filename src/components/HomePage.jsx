import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate=useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome to the Home Page!</h2>
        <p className="text-center text-gray-600 mb-8">Please sign in or sign up to continue.</p>

        <div className="flex justify-around mb-4">
          <button onClick={()=>navigate('/login')} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>
          <button onClick={()=>navigate('/signup')} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
