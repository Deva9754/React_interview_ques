// src/components/LogoutButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { auth } from '../firebase';  // Firebase auth import
import { signOut } from 'firebase/auth';  // Firebase signOut method

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);  
      dispatch(logout());  
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
