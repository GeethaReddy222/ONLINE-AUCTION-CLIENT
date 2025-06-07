import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaGavel,
  FaBars,
  FaTimes,
  FaUserShield,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaHammer,
  FaList,
  FaQuestionCircle
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items with unified configuration
  const navItems = [
    { path: '/#hero', label: 'Home', icon: <FaHome className="mr-2" />, section: 'hero' },
    { path: '/#features', label: 'Features', icon: <FaHammer className="mr-2" />, section: 'features' },
    { path: '/#categories', label: 'Categories', icon: <FaList className="mr-2" />, section: 'categories' },
    { path: '/#how-it-works', label: 'How It Works', icon: <FaQuestionCircle className="mr-2" />, section: 'how-it-works' },
  ];

  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/login', '/register', '/customerregister', '/adminregister'].includes(location.pathname);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
    setIsOpen(false);
    setIsRegisterOpen(false);
  }, [location]);

  // Function to handle section navigation
  const handleSectionNavigation = (section) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for the home page to load before scrolling
      setTimeout(() => {
        scrollToSection(section);
      }, 100);
    } else {
      scrollToSection(section);
    }
    setIsOpen(false);
  };

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle initial scroll if page loads with hash
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  }, [location]);

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

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleSectionNavigation(item.section)}
            className={`flex items-center hover:text-[#d4af37] transition-colors ${
              location.hash === `#${item.section}` || 
              (location.pathname === '/' && !location.hash && item.section === 'hero')
                ? 'text-[#d4af37] font-semibold border-b-2 border-[#d4af37]' 
                : 'text-[#2d3748]'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        {(isHomePage || (!isAuthenticated && !isAuthPage)) && (
          <>
            {/* Login Button */}
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

            {/* Register Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsRegisterOpen(!isRegisterOpen)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  ['/customerregister', '/adminregister'].includes(location.pathname)
                    ? 'bg-[#d4af37] text-white'
                    : 'text-[#2d3748] hover:bg-[#f8f9fa]'
                }`}
              >
                <FaUserPlus className="mr-2" />
                Register
                <svg 
                  className={`ml-2 h-4 w-4 transform transition-transform ${
                    isRegisterOpen ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isRegisterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to="/customerregister"
                    className="flex items-center px-4 py-2 text-[#2d3748] hover:bg-[#f8f9fa]"
                    onClick={() => setIsRegisterOpen(false)}
                  >
                    <FaUser className="mr-2 text-blue-600" />
                    Customer
                  </Link>
                  <Link
                    to="/adminregister"
                    className="flex items-center px-4 py-2 text-[#2d3748] hover:bg-[#f8f9fa]"
                    onClick={() => setIsRegisterOpen(false)}
                  >
                    <FaUserShield className="mr-2 text-purple-600" />
                    Admin
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {/* Authenticated User */}
        {isAuthenticated && (
          <button
            onClick={() => {
              localStorage.removeItem('user');
              setIsAuthenticated(false);
              navigate('/');
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center"
          >
            <FaSignInAlt className="mr-2 transform rotate-180" />
            Logout
          </button>
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
          {/* Navigation Items */}
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleSectionNavigation(item.section)}
              className={`flex items-center py-3 px-4 rounded-md transition-colors ${
                location.hash === `#${item.section}` || 
                (location.pathname === '/' && !location.hash && item.section === 'hero')
                  ? 'bg-[#d4af37] text-white'
                  : 'text-[#2d3748] hover:bg-[#f8f9fa]'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          {/* Auth Buttons */}
          {(isHomePage || (!isAuthenticated && !isAuthPage)) && (
            <>
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

              <div className="flex flex-col space-y-2 mt-2">
                <Link
                  to="/customerregister"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-md transition-colors ${
                    location.pathname === '/customerregister'
                      ? 'bg-[#d4af37] text-white'
                      : 'text-[#2d3748] hover:bg-[#f8f9fa]'
                  }`}
                >
                  <FaUser className="mr-2" />
                  Register as Customer
                </Link>
                <Link
                  to="/adminregister"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center py-3 px-4 rounded-md transition-colors ${
                    location.pathname === '/adminregister'
                      ? 'bg-[#d4af37] text-white'
                      : 'text-[#2d3748] hover:bg-[#f8f9fa]'
                  }`}
                >
                  <FaUserShield className="mr-2" />
                  Register as Admin
                </Link>
              </div>
            </>
          )}

          {/* Logout for authenticated users */}
          {isAuthenticated && (
            <button
              onClick={() => {
                localStorage.removeItem('user');
                setIsAuthenticated(false);
                setIsOpen(false);
                navigate('/');
              }}
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-md transition-colors mt-2"
            >
              <FaSignInAlt className="mr-2 transform rotate-180" />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 