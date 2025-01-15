import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../slices/authSlice';  // Import your signUp action
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, username } = formData;

    // Basic validation
    if (!email || !password || !username) {
      setError('Email, username, and password are required');
      return;
    }

    // Simulate the sign-up response
    const user = { username, email }; // Include the username that the user provided

    // Dispatch sign-up action to store user data in Redux
    dispatch(signUp(user));
    navigate('/login');  // Redirect to login page after successful sign-up
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
