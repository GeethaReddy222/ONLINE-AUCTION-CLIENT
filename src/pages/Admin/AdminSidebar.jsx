import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaBox, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`bg-gradient-to-b from-[#2d3748] to-[#1a202c] text-white min-h-screen flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8972e] flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">PB</span>
            </div>
            <h1 className="text-xl font-bold">
              <span className="text-[#d4af37]">Prime</span>Bid
            </h1>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-grow mt-6">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-4 transition-colors group ${
              isActive
                ? "bg-[#d4af37] text-white font-semibold"
                : "hover:bg-[#2d3748]"
            }`
          }
        >
          <FaHome className={`text-xl ${collapsed ? "mx-auto" : "mr-4"}`} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `flex items-center px-6 py-4 transition-colors group ${
              isActive
                ? "bg-[#d4af37] text-white font-semibold"
                : "hover:bg-[#2d3748]"
            }`
          }
        >
          <FaUser className={`text-xl ${collapsed ? "mx-auto" : "mr-4"}`} />
          {!collapsed && <span>Profile</span>}
        </NavLink>

        <NavLink
          to="/admin/pending-approvals"
          className={({ isActive }) =>
            `flex items-center px-6 py-4 transition-colors group ${
              isActive
                ? "bg-[#d4af37] text-white font-semibold"
                : "hover:bg-[#2d3748]"
            }`
          }
        >
          <FaBox className={`text-xl ${collapsed ? "mx-auto" : "mr-4"}`} />
          {!collapsed && <span>Pending Products</span>}
        </NavLink>

        <NavLink
          to="/product/active-products"
          className={({ isActive }) =>
            `flex items-center px-6 py-4 transition-colors group ${
              isActive
                ? "bg-[#d4af37] text-white font-semibold"
                : "hover:bg-[#2d3748]"
            }`
          }
        >
          <FaBox className={`text-xl ${collapsed ? "mx-auto" : "mr-4"}`} />
          {!collapsed && <span>Active Products</span>}
        </NavLink>

        <NavLink
          to="/admin/sold-products"
          className={({ isActive }) =>
            `flex items-center px-6 py-4 transition-colors group ${
              isActive
                ? "bg-[#d4af37] text-white font-semibold"
                : "hover:bg-[#2d3748]"
            }`
          }
        >
          <FaBox className={`text-xl ${collapsed ? "mx-auto" : "mr-4"}`} />
          {!collapsed && <span>Sold Items</span>}
        </NavLink>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto border-t border-gray-700 p-4">
        <button
          onClick={() => navigate("/")} 
          className="w-full flex items-center justify-center py-2 mb-5 px-4 bg-[#d4af37] hover:bg-[#b8972e] text-white font-medium rounded-lg transition-colors"
        >
          {!collapsed && <FaSignOutAlt className="mr-2" />}
          <span>{collapsed ? <FaSignOutAlt /> : "Sign Out"}</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
