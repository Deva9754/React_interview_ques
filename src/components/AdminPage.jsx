// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../slices/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase/Firebase';

// const AdminPage = () => {
//   const authState = useSelector((state) => state.auth); // Access auth state from Redux
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (authState.isAuthenticated && authState.user?.uid) {
//         const userDoc = await getDoc(doc(db, 'users', authState.user.uid));
//         if (userDoc.exists()) {
//           setUsername(userDoc.data().username);
//         }
//       }
//     };

//     fetchUserData();
//   }, [authState.isAuthenticated, authState.user?.uid]);

//   const handleLogout = () => {
//     dispatch(logout()); // Dispatch logout action to clear user data
//     navigate('/login'); // Redirect to login page after logout
//   };

//   // If the user is not authenticated, redirect them to the login page
//   if (!authState.isAuthenticated) {
//     navigate('/');
//   }

//   // Dummy grid items
//   const gridItems = [
//     'QUIZ', 'Pagination', 'Login(Yup)', 'Item 3',
//     'Item 4', 'Item 5', 'Item 6',
//     'Item 7', 'Item 8'
//   ];

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
//       <div className="flex justify-between items-center">
//         {/* Welcome message */}
//         <div className="text-white text-xl">
//           Welcome, {username}
//         </div>
//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Grid Container */}
//       <div className="mt-6 grid grid-cols-3 gap-4">
//         {gridItems.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer transition duration-300"
//             onClick={() => {
//               if (item === 'QUIZ') {
//                 navigate('/quiz');
//               } else if (item === 'Pagination') {
//                 navigate('/pagination');
//               } else if(item === 'Login(Yup)'){
//                 navigate('/loginyup');
//               }
//             }}
//           >
//             <p className="text-center text-black font-semibold">{item}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

const AdminPage = () => {
  const authState = useSelector((state) => state.auth); // Access auth state from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Redirect to login page if the user is not authenticated
    if (!authState.user) {
      navigate('/login');
    }
  }, [authState.user, navigate]); // Depend on authState.user to trigger the effect

  useEffect(() => {
    // Fetch the username from Firestore if the user is authenticated
    const fetchUserData = async () => {
      if (authState.user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', authState.user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [authState.user?.uid]); // Re-run the effect when the user ID changes

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear user data
    navigate('/login'); // Redirect to login page after logout
  };

  // Dummy grid items
  const gridItems = [
    'QUIZ', 'Pagination', 'Login-Yup', 'M/B-Tabs',
    'Item 4', 'Item 5', 'Item 6',
    'Item 7', 'Item 8'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="flex justify-between items-center">
        {/* Welcome message */}
        <div className="text-white text-xl">
          Welcome, {username || 'Loading...'}
        </div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Grid Container */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {gridItems.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer transition duration-300"
            onClick={() => {
              if (item === 'QUIZ') {
                navigate('/quiz');
              } else if (item === 'Pagination') {
                navigate('/pagination');
              } else if (item === 'Login-Yup') {
                navigate('/loginyup');
              }else if (item === 'M/B-Tabs') {
                navigate('/tabs');
              }
            }}
          >
            <p className="text-center text-black font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
