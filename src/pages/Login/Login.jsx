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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#d4af37] focus:ring-[#d4af37] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-[#d4af37] hover:text-[#b8972e]">
                  Forgot password?
                </Link>
              </div>
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
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;