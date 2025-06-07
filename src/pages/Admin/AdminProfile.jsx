import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBars,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/admin/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAdmin(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          contact: response.data.contact || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        setError("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      "http://localhost:5000/api/admin/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAdmin(response.data); 
    setEditMode(false);
  } catch (err) {
    console.error("Failed to update admin profile", err);
    alert("Failed to update profile. Please try again.");
  }
};

  
  return (
    <div className="h-screen flex bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] text-[#2d3748]">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Profile</h1>
            <p className="text-[#718096]">
              {editMode
                ? "Edit your profile details"
                : "View and manage your admin profile"}
            </p>
          </div>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8972e] hover:from-[#b8972e] hover:to-[#9c7c24] text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaSave className="mr-2" />
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-6">Profile Information</h3>

                <div className="space-y-6">
                  {/* Name */}
                  <ProfileField
                    label="Full Name"
                    icon={<FaUser className="text-[#d4af37] mr-3" />}
                    value={formData.name}
                    name="name"
                    editMode={editMode}
                    onChange={handleInputChange}
                  />

                  {/* Email */}
                  <ProfileField
                    label="Email Address"
                    icon={<FaEnvelope className="text-[#d4af37] mr-3" />}
                    value={formData.email}
                    name="email"
                    editMode={editMode}
                    onChange={handleInputChange}
                  />

                  {/* Contact */}
                  <ProfileField
                    label="Contact Number"
                    icon={<FaPhone className="text-[#d4af37] mr-3" />}
                    value={formData.contact}
                    name="contact"
                    editMode={editMode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Reusable field component
const ProfileField = ({ label, icon, value, name, editMode, onChange }) => (
  <div className="flex flex-col md:flex-row md:items-center">
    <div className="md:w-1/3 mb-2 md:mb-0">
      <label className="block text-[#718096] font-medium">{label}</label>
    </div>
    <div className="md:w-2/3">
      {editMode ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
        />
      ) : (
        <div className="flex items-center">
          {icon}
          <span className="text-lg">{value}</span>
        </div>
      )}
    </div>
  </div>
);

export default AdminProfile;
