import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5]">
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-yellow-600 text-2xl"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-yellow-500 font-bold text-lg">Admin Dashboard</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-yellow-500 shadow-md transform
            md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <AdminSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-yellow-500 inline-block pb-1">
            Admin Dashboard
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* CARD TEMPLATE */}
            {[
              {
                title: "Pending Products",
                desc: "Approve or reject newly added products.",
                iconBg: "bg-yellow-600",
                path: "/admin/pending-approvals",
                btnText: "Review Products"
              },
              {
                title: "Active Products",
                desc: "View and manage ongoing auctions.",
                iconBg: "bg-indigo-600",
                path: "/product/active-products",
                btnText: "View Active"
              },
              {
                title: "Sold Items",
                desc: "Review history of sold items and bids.",
                iconBg: "bg-red-600",
                path: "/admin/sold-items",
                btnText: "View Sold Items"
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl shadow transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
              >
                <div className="px-6 py-5">
                  <div className="flex items-center">
                    <div className={`${card.iconBg} rounded-lg p-3`}>
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 17v-2a4 4 0 014-4h4M9 5h6m2 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={() => navigate(card.path)}
                      className="inline-block w-full text-center px-4 py-2 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition duration-200"
                    >
                      {card.btnText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
