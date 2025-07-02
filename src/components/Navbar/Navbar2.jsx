import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaGavel,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaHome,
  FaSignOutAlt
} from 'react-icons/fa';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
    setIsOpen(false);
  };

  const goHome = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-10 h-10 bg-[#2d3748] rounded-full flex items-center justify-center mr-3">
          <FaGavel className="text-[#d4af37] text-xl" />
        </div>
        <h1 className="text-2xl font-bold text-[#2d3748]">
          Prime<span className="text-[#d4af37]">Bid</span>
        </h1>
      </div>

      {/* Desktop Navigation - Aligned to Right */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Home Button */}
        <button
          onClick={goHome}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            location.pathname === '/' 
              ? 'text-[#d4af37] font-semibold' 
              : 'text-[#2d3748] hover:text-[#d4af37]'
          }`}
        >
          <FaHome className="mr-2" />
          Home
        </button>

        {/* Logout Button (if authenticated) */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        )}

        {/* Login/Register (if not authenticated) */}
        {!isAuthenticated && !['/login', '/customerregister', '/adminregister'].includes(location.pathname) && (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/login'
                  ? 'bg-[#d4af37] text-white'
                  : 'text-[#2d3748] hover:bg-[#f8f9fa]'
              }`}
            >
              <FaSignInAlt className="mr-2" />
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-[#2d3748] focus:outline-none"
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-3 md:hidden z-40">
          {/* Home Button */}
          <button
            onClick={goHome}
            className={`flex items-center py-3 px-4 rounded-md transition-colors ${
              location.pathname === '/'
                ? 'bg-[#d4af37] text-white'
                : 'text-[#2d3748] hover:bg-[#f8f9fa]'
            }`}
          >
            <FaHome className="mr-2" />
            Home
          </button>

          {/* Logout Button (if authenticated) */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-md transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          )}

          {/* Login/Register (if not authenticated) */}
          {!isAuthenticated && !['/login', '/customerregister', '/adminregister'].includes(location.pathname) && (
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`flex items-center py-3 px-4 rounded-md transition-colors ${
                  location.pathname === '/login'
                    ? 'bg-[#d4af37] text-white'
                    : 'text-[#2d3748] hover:bg-[#f8f9fa]'
                }`}
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar2;