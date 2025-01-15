import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const authState = useSelector((state) => state.auth);  // Access auth state from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());  // Dispatch logout action to clear user data
    navigate('/login');  // Redirect to login page after logout
  };

  // If the user is not authenticated, redirect them to the login page
  if (!authState.isAuthenticated) {
    navigate('/login');
  }

  return (
    <div>
      {authState.isAuthenticated ? (
        <div>
          <h2>Welcome, {authState.user?.username}</h2> {/* Display the username stored during sign-up */}
          <p>Email: {authState.user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <h2>You must be logged in to access the admin page.</h2>
      )}
    </div>
  );
};

export default AdminPage;
