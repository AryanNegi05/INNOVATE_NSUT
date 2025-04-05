import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, LightbulbIcon, UserCircle, BookOpen, Award, Coffee, Search, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentPortal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const features = [
    {
      title: "AI Powered Canteen",
      description: "Smart food ordering system with personalized recommendations based on your preferences and dietary requirements.",
      icon: <Coffee className="w-12 h-12 text-indigo-200" />,
      color: "bg-indigo-700"
    },
    {
      title: "Lost & Found Tracker",
      description: "Advanced item tracking system using AI to help locate and return lost items across campus efficiently.",
      icon: <Search className="w-12 h-12 text-blue-200" />,
      color: "bg-blue-700"
    },
    {
      title: "Scholarship Portal",
      description: "Personalized scholarship matching algorithm to find opportunities tailored to your academic profile and achievements.",
      icon: <Award className="w-12 h-12 text-purple-200" />,
      color: "bg-purple-700"
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };
  
  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <LightbulbIcon className="text-white w-6 h-6" />
            <span className="text-xl font-bold">CAMPUS<span className="text-indigo-400">HUB</span></span>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li className="relative">
                <span className="cursor-pointer">Home</span>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full"></span>
              </li>
              <li><span className="cursor-pointer text-gray-300 hover:text-white transition">Courses</span></li>
              <li><span className="cursor-pointer text-gray-300 hover:text-white transition">Services</span></li>
              <li><span className="cursor-pointer text-gray-300 hover:text-white transition">About</span></li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-3">
          <Link to="/login">
        <button className="text-gray-300 hover:text-white px-4 py-2 flex items-center gap-1 transition">
          <LogIn className="w-4 h-4" />
          <span>Log in</span>
        </button>
      </Link>
      <Link to="/signup">
        <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center gap-1 transition">
          <UserPlus className="w-4 h-4" />
          <span>Sign up</span>
        </button>
      </Link>
          </div>
        </header>
        
        {/* Main Hero */}
        <main className="flex flex-col md:flex-row gap-8 items-center py-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold mb-4">The new<br />Student Experience</h1>
            <p className="text-xl text-gray-300 mb-2">SMART CAMPUS SOLUTIONS</p>
            <p className="text-gray-400 mb-8">A next-generation student portal with AI-powered tools designed to enhance your campus life and academic journey.</p>
            
            <div className="flex gap-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md font-medium transition">
                Get Started
              </button>
              <button className="border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-md font-medium flex items-center gap-2 transition">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-600">▶</span>
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Feature Slider */}
          <div className="md:w-1/2 relative">
            <div className={`${features[currentSlide].color} rounded-2xl p-6 relative overflow-hidden`}>
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-800/30 rounded-full blur-lg"></div>
              <div className="absolute right-8 top-12 w-32 h-32 bg-indigo-300/20 rounded-full blur-md"></div>
              
              <div className="relative z-10">
                <div className="mb-4">
                  {features[currentSlide].icon}
                </div>
                <h2 className="text-2xl font-bold mb-2">{features[currentSlide].title}</h2>
                <p className="text-gray-200 mb-6">{features[currentSlide].description}</p>
                <a href="#" className="text-indigo-200 hover:text-white inline-flex items-center gap-1 font-medium">
                  Learn more
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Slider Controls */}
            <div className="flex justify-center mt-4 gap-4">
              <button onClick={prevSlide} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2 items-center">
                {features.map((_, index) => (
                  <span 
                    key={index} 
                    className={`block w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-indigo-400 w-4' : 'bg-gray-600'}`}
                  ></span>
                ))}
              </div>
              
              <button onClick={nextSlide} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentPortal;