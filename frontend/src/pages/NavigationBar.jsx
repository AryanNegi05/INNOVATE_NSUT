import React, { useState } from 'react';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and site name */}
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span className="font-bold text-xl">FoundIt</span>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="hover:text-blue-200 transition-colors py-2">Home</a>
            <a href="/AddItem" className="hover:text-blue-200 transition-colors py-2">Found Items</a>
            <a href="/lostItem" className="hover:text-blue-200 transition-colors py-2">Lost Items</a>
            <a href="" className="hover:text-blue-200 transition-colors py-2">Report Found</a>
            <a href="" className="hover:text-blue-200 transition-colors py-2">Report Lost</a>
            <a href="" className="hover:text-blue-200 transition-colors py-2">About</a>
          </div>
          
          {/* User section */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="hover:text-blue-200 transition-colors">Login</a>
            <a href="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">Sign Up</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <div className="flex flex-col space-y-3">
              <a href="/" className="hover:bg-blue-700 px-3 py-2 rounded-md">Home</a>
              <a href="/found-items" className="hover:bg-blue-700 px-3 py-2 rounded-md">Found Items</a>
              <a href="/lost-items" className="hover:bg-blue-700 px-3 py-2 rounded-md">Lost Items</a>
              <a href="/report-found" className="hover:bg-blue-700 px-3 py-2 rounded-md">Report Found</a>
              <a href="/report-lost" className="hover:bg-blue-700 px-3 py-2 rounded-md">Report Lost</a>
              <a href="/about" className="hover:bg-blue-700 px-3 py-2 rounded-md">About</a>
              <div className="pt-4 border-t border-blue-500 flex flex-col space-y-3">
                <a href="/login" className="hover:bg-blue-700 px-3 py-2 rounded-md">Login</a>
                <a href="/register" className="bg-white text-blue-600 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors text-center">Sign Up</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;