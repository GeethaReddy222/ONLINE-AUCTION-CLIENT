import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserShield, FaLock, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "*Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "*Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "*Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "*Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "*Password must be at least 6 characters";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "*Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "*Contact number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setIsLoading(true);
  try {
    const response = await axios.post("http://localhost:5000/api/admin/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
    });

    if (response.data.success) {
      setSuccessMessage("✅ Admin account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      setFormData({ name: "", email: "", password: "", contact: "" });
      setErrors({});
    } else {
      setErrors({ server: response.data.message || "Something went wrong" });
    }
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Registration failed. Please try again.";
    setErrors({ server: errorMsg });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Visual Section */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-[#2d3748] to-[#1a202c] p-8 text-white flex flex-col items-center justify-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#d4af37]/10 z-0"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#d4af37]/10 z-0"></div>
          
          <div className="relative z-10 w-full max-w-xs">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserShield className="text-[#d4af37] text-2xl" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                <span className="text-[#d4af37]">Prime</span>Bid Admin
              </h1>
              <p className="text-gray-300">Administrator Registration Portal</p>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: <FaLock className="text-[#d4af37]" />, text: "Enterprise-grade security" },
                { icon: <FaUser className="text-[#d4af37]" />, text: "Full admin controls" },
                { icon: <FaEnvelope className="text-[#d4af37]" />, text: "Verified accounts only" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center p-3 bg-[#2d3748]/50 rounded-lg backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mr-3">
                    {feature.icon}
                  </div>
                  <p className="text-gray-200">{feature.text}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center text-gray-300 text-sm">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="text-[#d4af37] font-medium hover:underline transition-all inline-flex items-center mt-1"
              >
                Login to your account <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-3/5 p-8">
          <div className="text-center mb-10 mt-5">
            <h2 className="text-2xl font-bold text-[#2d3748]">
              Create Admin Account
            </h2>
            <p className="text-[#718096] mt-2">
              Register for exclusive access to the admin dashboard
            </p>
          </div>

          {errors.server && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6">
              <p>{errors.server}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded mb-6">
              <p>{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#718096]">
                <FaUser />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 text-sm rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#718096]">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 text-sm rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#718096]">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 text-sm rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#718096] hover:text-[#d4af37] text-sm"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Contact Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#718096]">
                <FaPhone />
              </div>
              <input
                type="text"
                name="contact"
                placeholder="Contact number"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 text-sm rounded-lg border ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all`}
              />
              {errors.contact && (
                <p className="mt-1 text-xs text-red-600">{errors.contact}</p>
              )}
            </div>

           

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-5 px-4 bg-gradient-to-r from-[#d4af37] to-[#b8972e] hover:from-[#b8972e] hover:to-[#9c7c24] text-white font-medium rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 transition-all ${
                isLoading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:translate-y-[-1px] hover:shadow-lg"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Registering...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaUserShield className="mr-2" />
                  Create Admin Account
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;