import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerSidebar from "./CustomerSidebar";
import { 
  FaBars, FaClock, FaTag, FaGavel, FaMoneyBillWave, 
  FaChartLine, FaEllipsisV, FaChevronLeft, FaChevronRight 
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeAuctions: 0,
    totalBids: 0,
    highestBid: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const decoded = jwtDecode(token);
    const sellerId = decoded.id;

    // Fetch seller products
    axios.get(`http://localhost:5000/api/customer/my-products/${sellerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setProducts(res.data);
      
      // Calculate statistics
      const activeAuctions = res.data.filter(p => p.status === 'active').length;
      const totalBids = res.data.reduce((sum, product) => sum + product.bids.length, 0);
      const highestBid = res.data.reduce((max, product) => {
        const productMax = Math.max(...product.bids.map(b => b.amount), 0);
        return productMax > max ? productMax : max;
      }, 0);
      
      setStats({
        totalProducts: res.data.length,
        activeAuctions,
        totalBids,
        highestBid
      });
      
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

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { color: "bg-green-100 text-green-800", icon: "bg-green-500" },
      completed: { color: "bg-purple-100 text-purple-800", icon: "bg-purple-500" },
      draft: { color: "bg-yellow-100 text-yellow-800", icon: "bg-yellow-500" },
      scheduled: { color: "bg-blue-100 text-blue-800", icon: "bg-blue-500" },
      canceled: { color: "bg-red-100 text-red-800", icon: "bg-red-500" }
    };
    
    return statusMap[status] || statusMap.draft;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Image slider component for each product
  const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    if (!images || images.length === 0) {
      return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 w-full h-48 flex items-center justify-center">
          <FaTag className="text-4xl text-blue-400 opacity-50" />
        </div>
      );
    }
    
    const goToPrev = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
    
    const goToNext = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
    
    return (
      <div className="relative w-full h-48 overflow-hidden group">
        <img 
          src={images[currentIndex].url} 
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
            >
              <FaChevronLeft />
            </button>
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <FaChevronRight />
            </button>
          </>
        )}
        
        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile top bar */}
      <div className="md:hidden p-4 bg-gradient-to-r from-blue-600 to-indigo-700 shadow flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-2xl"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-white font-bold text-xl">My Products</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-blue-800 to-indigo-900 shadow-md transform
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
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Auction Products</h1>
            <p className="text-gray-600 mt-2">
              Manage all your auction listings in one place
            </p>
          </div>
          
          {/* Products grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-4 text-gray-600">Loading your products...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 rounded-xl p-6 border border-red-100 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-red-800">Error loading products</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-12 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <FaTag className="text-4xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  You haven't listed any products for auction yet. Start your first auction to see it here.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all">
                  Create New Auction
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const statusBadge = getStatusBadge(product.status);
                
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all"
                  >
                    {/* Image slider */}
                    <div className="relative">
                      <ImageSlider className="w-100 h-100" images={product.images} />
                      
                      {/* Status badge */}
                      <div className={`absolute top-4 right-4 ${statusBadge.color} px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                        <span className={`w-2 h-2 rounded-full ${statusBadge.icon} mr-2`}></span>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </div>
                    </div>
                    
                    {/* Product info */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaEllipsisV />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description || "No description available"}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Starting Price</p>
                          <p className="font-semibold text-gray-800">₹{product.startingPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Current Bid</p>
                          <p className="font-semibold text-blue-600">₹{product.currentPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Bids</p>
                          <p className="font-semibold text-gray-800">{product.bids.length}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Category</p>
                          <p className="font-semibold text-gray-800 capitalize">{product.category}</p>
                        </div>
                      </div>
                      
                      {/* Auction timeline */}
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <FaClock className="text-gray-500 mr-2" />
                          <span className="font-medium">Auction Timeline</span>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-600">
                          <div>
                            <p className="font-medium">Start</p>
                            <p>{formatTime(product.startTime)}</p>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-medium">End</p>
                            <p>{formatTime(product.endTime)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
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

export default MyProducts;