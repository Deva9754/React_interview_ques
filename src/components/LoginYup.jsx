import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const LoginYup = () => {
    const navigate=useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    gender: '',
    birthdate: ''
  });

  const [error, setError] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is Required"),
    lastName: Yup.string().required("Last name is Required"),
    email: Yup.string().email("Invalid email format").required("Email is Required"),
    gender: Yup.string().required("Gender is required"),
    birthdate: Yup.date()
      .nullable()
      .transform((curr, originalValue) => originalValue === '' ? null : curr)
      .required("Date of birth is required")
      .typeError("Invalid Date"),
    phone: Yup.string()
      .transform(value => value === undefined ? '' : value.toString())
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    password: Yup.string().required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Enter at least one number")
      .matches(/[A-Z]/, "Enter at least one uppercase letter")
      .matches(/[a-z]/, "Enter at least one lowercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Enter at least one symbol"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setError(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <button
          type="button"
          onClick={()=>navigate('/admin')}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 font-semibold"
        >
          &larr; Back to Admin
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="firstName">First Name:</label>
          <input 
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter your first name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.firstName && <div className="text-red-500 text-xs mt-1">{error.firstName}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Enter your last name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.lastName && <div className="text-red-500 text-xs mt-1">{error.lastName}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.email && <div className="text-red-500 text-xs mt-1">{error.email}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.password && <div className="text-red-500 text-xs mt-1">{error.password}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.confirmPassword && <div className="text-red-500 text-xs mt-1">{error.confirmPassword}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.phone && <div className="text-red-500 text-xs mt-1">{error.phone}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            placeholder="Enter your age"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.age && <div className="text-red-500 text-xs mt-1">{error.age}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="gender">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          {error.gender && <div className="text-red-500 text-xs mt-1">{error.gender}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="birthdate">DOB:</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.birthdate && <div className="text-red-500 text-xs mt-1">{error.birthdate}</div>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginYup;
