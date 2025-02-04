import React, { useState } from 'react';

const Profile = ({ data, setData }) => {
  const { name, age, email } = data;

  // Local state to handle validation errors
  const [errors, setErrors] = useState({
    name: '',
    age: '',
    email: ''
  });

  // Handle data changes and validation
  const handleDataChange = (e, item) => {
    const value = e.target.value;

    // Update the data
    setData((prevState) => ({
      ...prevState,
      [item]: value
    }));

    // Clear error for the updated field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [item]: ''
    }));

    // Re-validate each field whenever the user types
    validateField(item, value);
  };

  // Validate individual field
  const validateField = (item, value) => {
    let errorMessage = '';
    
    if (item === 'name') {
      if (!value.trim()) {
        errorMessage = 'Name is required';
      }
    }

    if (item === 'age') {
      if (!value || value <= 0) {
        errorMessage = 'Age must be a valid positive number';
      }
    }

    if (item === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMessage = 'Email is required';
      } else if (!emailRegex.test(value)) {
        errorMessage = 'Email is invalid';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [item]: errorMessage
    }));
  };

  return (
    <div>
      <h3>Profile Component</h3>
      <div className="p-2">
        <label className="p-2">Name:</label>
        <input
          type="text"
          onChange={(e) => handleDataChange(e, 'name')}
          className="p-1 border border-black rounded-lg"
          placeholder="Enter your name"
          value={name}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </div>

      <div className="p-2">
        <label className="p-2">Age:</label>
        <input
          type="number"
          onChange={(e) => handleDataChange(e, 'age')}
          className="p-1 border border-black rounded-lg"
          placeholder="Enter your age"
          value={age}
        />
        {errors.age && <span className="text-red-500">{errors.age}</span>}
      </div>

      <div className="p-2">
        <label className="p-2">Email:</label>
        <input
          type="email"
          onChange={(e) => handleDataChange(e, 'email')}
          className="p-1 border border-black rounded-lg"
          placeholder="Enter your email"
          value={email}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
    </div>
  );
};

export default Profile;
