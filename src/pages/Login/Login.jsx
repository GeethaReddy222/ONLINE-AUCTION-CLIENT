import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserShield, FaUser, FaGavel, FaLock, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "" 
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "*Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "*Invalid email";

    if (!formData.password) newErrors.password = "*Password is required";
    else if (formData.password.length < 6) newErrors.password = "*Minimum 6 characters";
    if (!formData.role) newErrors.role = "*Please select user type"; 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setIsLoading(true);

  try {
    const loginRole = formData.role.toLowerCase();
    const response = await axios.post(
      `http://localhost:5000/api/${loginRole}/login`, 
      {
        email: formData.email,
        password: formData.password,
        role: loginRole
      }
    );

    const token = response?.data?.token;
    const user = response?.data?.user;

    if (!token || !user) {
      throw new Error("Invalid response from server");
    }

    const userName = user.name || user.username || "User";

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("name", userName);
    localStorage.setItem("userId", user.id);  // Consistent ID field

    alert(`Welcome, ${userName}`);

    switch (user.role.toLowerCase()) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'customer':
        navigate('/customer-dashboard');
        break;
      default:
        navigate('/');
    }

  } catch (err) {
    const errorMessage = err.response?.data?.message || 
                         err.message || 
                         "Login failed";
    alert(errorMessage);
    console.error("Login error:", err);
  } finally {
    setIsLoading(false);
  }
};

   const getRoleIcon = () => {
    if (formData.role === "admin") return <FaUserShield className="text-[#d4af37]" />;
    if (formData.role === "customer") return <FaUser className="text-[#d4af37]" />;
    return <FaUser className="text-gray-400" />;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-gray-200">
        {/* Left Section - Visual */}
        <div className="bg-gradient-to-br from-[#2d3748] to-[#1a202c] text-white w-full md:w-2/5 p-10 flex flex-col justify-center relative">
          <div className="absolute top-6 left-6 flex items-center">
            <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center mr-3">
              <FaGavel className="text-[#2d3748] text-xl" />
            </div>
            <h1 className="text-xl font-bold">
              Prime<span className="text-[#d4af37]">Bid</span>
            </h1>
          </div>
          
          <div className="text-center z-10">
            <div className="w-24 h-24 mx-auto bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-6">
              <FaLock className="text-[#d4af37] text-4xl" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Secure Login</h2>
            <p className="mb-6 text-blue-100 max-w-xs mx-auto">
              Access your premium auction dashboard and continue your bidding journey
            </p>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Not a member?</h3>
              <Link 
                to="/adminregister"
                className="inline-block bg-[#d4af37] hover:bg-[#b8972e] text-white font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Register Now
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 -left-8 w-16 h-16 rounded-full bg-[#d4af37]/20 z-0"></div>
          <div className="absolute bottom-1/4 -right-8 w-20 h-20 rounded-full bg-[#d4af37]/20 z-0"></div>
          <div className="absolute top-1/3 right-8 w-12 h-12 rounded-full bg-[#d4af37]/20 z-0"></div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-3/5 p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#2d3748] mb-2">Welcome Back</h3>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent`}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-[#d4af37]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {getRoleIcon()}
              </div>
              <select
                name="role"  
                id="role" 
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.userType ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent appearance-none bg-white`}
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-[#d4af37] to-[#b8972e] text-white font-semibold py-3 rounded-lg transition-all duration-300 ${
                isLoading ? 'opacity-70' : 'hover:from-[#b8972e] hover:to-[#a08427] hover:shadow-lg'
              } flex items-center justify-center`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Authenticating...' : (
                <span className="flex items-center">
                  Login <FaGavel className={`ml-2 transition-transform ${isHovered ? 'transform -rotate-12' : ''}`} />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8">
           

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;