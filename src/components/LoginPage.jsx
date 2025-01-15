import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';  // Import your login action
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    // Simulate the login response (you would typically validate against a backend here)
    const user = { email };  // Use the email provided, username is stored during sign-up

    // Dispatch login action to authenticate user (no need to pass username here)
    dispatch(login(user));
    navigate('/admin');  // Redirect to Admin Page after successful login
  };

  return (
    <div>
      <h2>Login</h2>
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
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
