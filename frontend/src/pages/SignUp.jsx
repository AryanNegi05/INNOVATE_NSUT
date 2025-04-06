import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, User, Phone, UserCircle, LightbulbIcon } from 'lucide-react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    accountType: '', // e.g., "Student" or "Instructor"
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://innovate-nsut.onrender.com/api/v1/auth/signup', formData);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="w-full max-w-2xl px-6">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <LightbulbIcon className="text-indigo-400 w-6 h-6" />
            <span className="text-xl font-bold text-white">CAMPUS<span className="text-indigo-400">HUB</span></span>
          </div>
        </div>
        
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 shadow-xl rounded-lg px-8 pt-6 pb-6 mb-4 border border-slate-700"
        >
          <h2 className="text-2xl font-bold mb-5 text-center text-white">Sign Up</h2>

          {message && (
            <div className="mb-4 text-center text-red-300 text-sm bg-red-900/30 p-2 rounded">
              {message}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block text-gray-300 text-sm font-medium mb-1">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  className="bg-slate-700 w-full pl-10 pr-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  className="bg-slate-700 w-full pl-10 pr-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  className="bg-slate-700 w-full pl-10 pr-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@university.edu"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Contact Number (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="contactNumber"
                  className="bg-slate-700 w-full pl-10 pr-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Account Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCircle className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="accountType"
                className="bg-slate-700 w-full pl-10 pr-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:border-indigo-500 text-white appearance-none"
                value={formData.accountType}
                onChange={handleChange}
                required
              >
                <option value="">Select Account Type</option>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  className="bg-slate-700 w-full pl-10 pr-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  className="bg-slate-700 w-full pl-10 pr-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Register
            </button>
          </div>
        </form>
        
        <p className="text-center text-gray-400 text-sm">
          Already have an account? <a href="#" className="text-indigo-400 hover:text-indigo-300">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;