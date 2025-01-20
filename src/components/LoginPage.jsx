// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice'; 
// import { auth, signInWithEmailAndPassword } from '../firebase/Firebase';  
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     if (!email || !password) {
//       setError('Email and password are required');
//       return;
//     }

//     dispatch(loginStart());

//     try {
//       // Firebase login method
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Dispatch loginSuccess to store the user in Redux
//       dispatch(loginSuccess(user));
//       navigate('/admin'); // Redirect to Admin Page after successful login
//     } catch (err) {
//       // Dispatch loginFailure if login fails
//       dispatch(loginFailure(err.message));
//       setError(err.message); // Display the error message from Firebase
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//       <div className="bg-black bg-opacity-35 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-black-600">
//             Don't have an account?{' '}
//             <button
//               onClick={() => navigate('/signup')}
//               className="text-blue-500 hover:text-blue-700 transition duration-200"
//             >
//               Sign Up
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice'; 
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from '../firebase/Firebase';  
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    dispatch(loginStart());

    try {
      // Firebase email/password login method
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Sanitize the user object before dispatching to avoid non-serializable data
      const sanitizedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      dispatch(loginSuccess(sanitizedUser));
      navigate('/admin'); // Redirect to Admin Page after successful login
    } catch (err) {
      dispatch(loginFailure(err.message));
      setError(err.message); // Display the error message from Firebase
    }
  };

  const handleGoogleLogin = async () => {
    dispatch(loginStart());

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Sanitize the user object before dispatching to avoid non-serializable data
      const sanitizedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      dispatch(loginSuccess(sanitizedUser));
      navigate('/admin'); // Redirect to Admin Page after successful login
    } catch (err) {
      dispatch(loginFailure(err.message));
      setError(err.message); // Display the error message from Firebase
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-black bg-opacity-35 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
          >
            Login with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-black-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-500 hover:text-blue-700 transition duration-200"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
