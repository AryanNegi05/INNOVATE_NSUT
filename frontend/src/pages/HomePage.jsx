import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, LightbulbIcon, UserCircle, BookOpen, Award, Coffee, Search, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const StudentPortal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const splineContainerRef = useRef(null);
  
  // Detect scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const features = [
    {
      title: "AI Powered Canteen",
      description: "Smart food ordering system with personalized recommendations based on your preferences and dietary requirements.",
      icon: <Coffee className="w-12 h-12 text-indigo-200" />,
      color: "from-indigo-700 to-indigo-900"
    },
    {
      title: "Lost & Found Tracker",
      description: "Advanced item tracking system using AI to help locate and return lost items across campus efficiently.",
      icon: <Search className="w-12 h-12 text-blue-200" />,
      color: "from-blue-700 to-blue-900"
    },
    {
      title: "Scholarship Portal",
      description: "Personalized scholarship matching algorithm to find opportunities tailored to your academic profile and achievements.",
      icon: <Award className="w-12 h-12 text-purple-200" />,
      color: "from-purple-700 to-purple-900"
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };
  
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 min-h-screen text-white font-sans relative overflow-hidden">
      {/* Spline 3D Background */}
      <div className="fixed inset-0 z-0 opacity-70" ref={splineContainerRef}>
        <div className={`transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* <Spline 
            scene="https://prod.spline.design/6dfba63b893f604c58e58f2028744997/scene.splinecode" 
            onLoad={handleSplineLoad}
          /> */}
        </div>
      </div>
      
      {/* Overlay gradient to ensure content visibility over Spline */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-indigo-950/70 z-0 pointer-events-none"></div>
      
      {/* Glass Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600/30 backdrop-blur-md p-2 rounded-xl">
                <LightbulbIcon className="text-indigo-300 w-6 h-6" />
              </div>
              <span className="text-xl font-bold">CAMPUS<span className="text-indigo-400">HUB</span></span>
            </div>
            
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li className="relative group">
                  <span className="cursor-pointer group-hover:text-indigo-300 transition-colors">Home</span>
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-400 rounded-full transform scale-x-100 origin-left transition-transform"></span>
                </li>
                <li className="relative group">
                  <span className="cursor-pointer text-gray-300 group-hover:text-indigo-300 transition-colors">Courses</span>
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-400 rounded-full transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </li>
                <li className="relative group">
                  <span className="cursor-pointer text-gray-300 group-hover:text-indigo-300 transition-colors">Services</span>
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-400 rounded-full transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </li>
                <li className="relative group">
                  <span className="cursor-pointer text-gray-300 group-hover:text-indigo-300 transition-colors">About</span>
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-400 rounded-full transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </li>
              </ul>
            </nav>
            
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="text-gray-300 hover:text-white px-4 py-2 flex items-center gap-1 transition hover:bg-white/5 rounded-lg">
                  <LogIn className="w-4 h-4" />
                  <span>Log in</span>
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-indigo-600/80 hover:bg-indigo-700 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-1 transition shadow-lg shadow-indigo-600/20 ring-1 ring-white/10">
                  <UserPlus className="w-4 h-4" />
                  <span>Sign up</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Hero Section */}
        <div className="pt-24 pb-12 relative overflow-hidden rounded-3xl mt-12">
          {/* Glass background for hero section */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 z-10"></div>
          </div>
          
          {/* Hero Content */}
          <main className="flex flex-col md:flex-row gap-8 items-center py-12 px-6 relative z-20">
            <div className="md:w-1/2 p-8 backdrop-blur-sm bg-slate-900/40 rounded-2xl border border-slate-700/50 shadow-xl">
              <div className="inline-block px-4 py-2 bg-indigo-500/20 backdrop-blur-sm rounded-full text-indigo-200 font-medium text-sm mb-6">
                Next Generation Campus Experience
              </div>
              <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">The Smart<br />Student Experience</h1>
              <p className="text-xl text-indigo-200 mb-3 font-medium">POWERED BY AI TECHNOLOGY</p>
              <p className="text-gray-300 mb-8 leading-relaxed">A next-generation student portal with AI-powered tools designed to enhance your campus life and academic journey.</p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 rounded-xl font-medium transition shadow-lg shadow-indigo-700/20 ring-1 ring-white/20">
                  Get Started
                </button>
                <button className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-indigo-400 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition group">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-500 transition-colors">▶</span>
                  Watch Demo
                </button>
              </div>
            </div>
            
            {/* Feature Slider with improved glassmorphism */}
            <div className="md:w-1/2 relative">
              <div className={`bg-gradient-to-br ${features[currentSlide].color} rounded-2xl p-8 relative overflow-hidden backdrop-blur-lg shadow-2xl border border-white/10 transform transition-all duration-500`}>
                <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute right-8 top-12 w-32 h-32 bg-white/10 rounded-full blur-md"></div>
                
                <div className="relative z-10">
                  <div className="mb-6 bg-white/10 p-4 rounded-xl inline-block backdrop-blur-md">
                    {features[currentSlide].icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{features[currentSlide].title}</h2>
                  <p className="text-gray-200 mb-6 leading-relaxed">{features[currentSlide].description}</p>
                  <a href="#" className="text-indigo-200 hover:text-white inline-flex items-center gap-1 font-medium group">
                    Learn more
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              {/* Slider Controls */}
              <div className="flex justify-center mt-6 gap-4">
                <button onClick={prevSlide} className="p-2 bg-slate-800/70 hover:bg-indigo-600/70 rounded-full transition backdrop-blur-sm border border-white/10">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2 items-center">
                  {features.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`block h-2 rounded-full transition-all ${currentSlide === index ? 'bg-indigo-400 w-8' : 'bg-gray-600 hover:bg-gray-500 w-2'}`}
                    ></button>
                  ))}
                </div>
                
                <button onClick={nextSlide} className="p-2 bg-slate-800/70 hover:bg-indigo-600/70 rounded-full transition backdrop-blur-sm border border-white/10">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </main>
        </div>
        
        {/* Floating glass elements for visual interest */}
        <div className="absolute top-1/3 left-12 transform -translate-y-1/2 w-32 h-32 rounded-2xl bg-purple-600/10 backdrop-blur-md border border-purple-500/20 rotate-12 hidden lg:block"></div>
        <div className="absolute bottom-32 right-12 w-24 h-24 rounded-2xl bg-indigo-600/10 backdrop-blur-md border border-indigo-500/20 -rotate-6 hidden lg:block"></div>
        <div className="absolute top-24 right-1/4 w-16 h-16 rounded-lg bg-blue-600/10 backdrop-blur-sm border border-blue-500/20 rotate-45 hidden lg:block"></div>
      </div>
    </div>
  );
};

export default StudentPortal;