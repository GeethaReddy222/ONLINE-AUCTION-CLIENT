import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerSidebar from "./CustomerSidebar";
import { FaBars } from "react-icons/fa";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:4000/customer/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            "Failed to fetch your products. Please try again."
        );
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Mobile top bar */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 text-2xl"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-blue-600 font-bold text-lg">My Products</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-600 shadow-md transform
            md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <CustomerSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-blue-gray-800 bg-opacity-30 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-600 text-center mt-10">
              You have not added any products for auction.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded shadow p-4 flex flex-col"
                >
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-700 mb-1">
                    Category: <span className="capitalize">{product.category}</span>
                  </p>
                  <p className="text-gray-700 mb-1">
                    Starting Price: ₹{product.startingPrice.toFixed(2)}
                  </p>
                  <p className="text-gray-700 mb-1">
                    Current Price: ₹{product.currentPrice.toFixed(2)}
                  </p>
                  <p className="text-gray-700 mb-1">
                    Status: <span className="capitalize">{product.status}</span>
                  </p>
                  <p className="text-gray-700 mb-1">
                    Auction Start: {new Date(product.startTime).toLocaleString()}
                  </p>
                  <p className="text-gray-700 mb-1">
                    Auction End: {new Date(product.endTime).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyProducts;
