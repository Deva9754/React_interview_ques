import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from '../firebase/Firebase'; // Firebase imports
import { setDoc, doc } from 'firebase/firestore';  // Import Firestore functions
import { db } from '../firebase/Firebase';  // Import db from Firebase;





const SignUpPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = formData;

    // Basic validation
    if (!email || !password || !username) {
      setError('Email, username, and password are required');
      return;
    }

    try {
      // Create a new user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ensure the user is authenticated before proceeding
      if (user) {
        // Save the username in Firestore under the 'users' collection
        await setDoc(doc(db, 'users', user.uid), {
          username: username,
          email: email,
        });

        // After successful sign-up, navigate to the login page
        navigate('/login');
      } else {
        setError('User creation failed. Please try again.');
      }
    } catch (err) {
      // Firebase error handling
      const errorMessage = err.code === 'auth/email-already-in-use' 
        ? 'This email is already in use. Please try another one.'
        : 'An error occurred. Please try again later.';
      
      setError(errorMessage);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Check if user is authenticated
      if (user) {
        // Save the username in Firestore under the 'users' collection
        await setDoc(doc(db, 'users', user.uid), {
          username: user.displayName || 'Anonymous',
          email: user.email,
        });

        // After successful sign-up, navigate to the login page
        navigate('/login');
      }
    } catch (err) {
      setError(err.message); // Display any error from Firebase
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
      <div className='bg-black bg-opacity-35 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-gray-200 mb-6'>Sign Up</h2>
        {error && <p className='text-red-400 text-center mb-4'>{error}</p>}
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            type="submit"
            className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300'
          >
            Sign Up
          </button>
        </form>

        {/* Google Signup Button */}
        <div className="mt-6 text-center">
  <button
    onClick={handleGoogleSignup}
    className="w-full py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 flex items-center justify-center space-x-4"
  >
    {/* Google Logo Image */}
    <img 
      src="https://user-images.githubusercontent.com/194400/70987158-4069c900-20b7-11ea-892e-8a2e1166b6b7.png" 
      alt="Google logo" 
      className="w-6 h-6" 
    />
    {/* Button Text */}
    <span>Sign Up with Google</span>
  </button>
</div>


        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className='text-blue-500 hover:text-blue-700 transition duration-200'
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
