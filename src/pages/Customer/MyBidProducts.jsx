import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerSidebar from "./CustomerSidebar"; // your sidebar component
import { FaBars } from "react-icons/fa";

const MyBidProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Decode user ID from JWT token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload._id || payload.id || null;
    } catch {
      return null;
    }
  };
  const userId = getUserIdFromToken();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:4000/customer/products/bidded", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            "Failed to fetch bidded products. Please try again."
        );
        setLoading(false);
      });
  }, []);

  // Get highest bid amount for this user on a product
  const getUserHighestBid = (product, userId) => {
    const userBids = product.bids.filter(
      (bid) =>
        bid.bidder._id === userId || // populated bidder object
        bid.bidder === userId // sometimes just ObjectId string
    );
    if (userBids.length === 0) return null;
    return Math.max(...userBids.map((bid) => bid.amount));
  };

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
        <h1 className="text-blue-600 font-bold text-lg">Bidded Products</h1>
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
              You have not placed any bids yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const highestBid = getUserHighestBid(product, userId);
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded shadow p-4 flex flex-col"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-700 mb-1">
                      Category: <span className="capitalize">{product.category}</span>
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
                    {highestBid !== null && (
                      <p className="mt-2 font-semibold text-blue-600">
                        Your Highest Bid: ₹{highestBid.toFixed(2)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyBidProducts;
