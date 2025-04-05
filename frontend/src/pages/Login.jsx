import React, { useState } from "react";
import axios from "axios";

import { Mail, Lock, LightbulbIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
  
      setMessage(res.data.message);
      console.log("Login Success:", res.data);
      localStorage.setItem("userId", res.data.userId); // Store userId in localStorage
      localStorage.setItem("type", res.data.accountType); // Store userId in localStorage
      localStorage.setItem("email", res.data.email); // Store userId in localStorage
      localStorage.setItem("token", res.data.token); // Store userId in localStorage
      console.log("Login Success:", res.data);
  
      // Redirect to master page after login
      navigate("/masterpage"); // or whatever your route is
  
    } catch (err) {
      console.error("Login Error:", err.response?.data || err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="w-full max-w-md px-6">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <LightbulbIcon className="text-indigo-400 w-6 h-6" />
            <span className="text-xl font-bold text-white">CAMPUS<span className="text-indigo-400">HUB</span></span>
          </div>
        </div>
        
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-slate-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

          {message && (
            <div className="mb-4 text-center text-green-300 text-sm bg-green-900/30 p-2 rounded">
              {message}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                className="bg-slate-700 w-full pl-10 pr-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@university.edu"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="bg-slate-700 w-full pl-10 pr-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:border-indigo-500 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Login
            </button>
          </div>
          
          <div className="text-center mt-6">
            <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm">
              Forgot your password?
            </a>
          </div>
        </form>
        
        <p className="text-center text-gray-400 text-sm">
          Don't have an account? <a href="#" className="text-indigo-400 hover:text-indigo-300">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;