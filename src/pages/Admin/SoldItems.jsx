import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaUser,
  FaTag,
  FaClock,
  FaExclamationTriangle,
  FaTrophy,
  FaChevronLeft,
  FaChevronRight,
   FaFilter
} from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const SoldItems = () => {
  const [soldProducts, setSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  // Define categories based on your product schema
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'food', name: 'Food & Beverage' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'books', name: 'Books' }
  ];

  useEffect(() => {
    const fetchSoldItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/sold-products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSoldProducts(response.data);
        
        // Initialize current image indices
        const indices = {};
        response.data.forEach((product) => {
          indices[product._id] = 0;
        });
        setCurrentImageIndices(indices);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch sold products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSoldItems();
  }, []);

  const handleNextImage = (productId, e) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => {
      const product = soldProducts.find(p => p._id === productId);
      const currentIndex = prev[productId] || 0;
      const nextIndex = (currentIndex + 1) % (product.images?.length || 1);
      return {...prev, [productId]: nextIndex};
    });
  };

  const handlePrevImage = (productId, e) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => {
      const product = soldProducts.find(p => p._id === productId);
      const currentIndex = prev[productId] || 0;
      const prevIndex = (currentIndex - 1 + (product.images?.length || 1)) % (product.images?.length || 1);
      return {...prev, [productId]: prevIndex};
    });
  };

  const refreshList = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/sold-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSoldProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch sold products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = soldProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (categoryFilter === "all") return matchesSearch;
    return matchesSearch && product.category === categoryFilter;
  });

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading sold items data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
            <p className="font-medium">Error: {error}</p>
            <p className="mt-2 text-sm">
              Please try again later or contact support
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] text-[#2d3748]">
      {/* Sidebar - Always visible */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#2d3748]">
                Sold Items
              </h1>
              <p className="text-[#718096] mt-1">
                View all successfully auctioned items
              </p>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden bg-[#d4af37] text-white p-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search sold items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="appearance-none block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="flex items-center px-4 py-2 bg-white border border-[#d4af37] text-[#d4af37] rounded-lg hover:bg-[#d4af37] hover:text-white transition-colors"
                onClick={refreshList}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-amber-100 border-2 border-amber-200 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaExclamationTriangle className="text-amber-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Sold Items Found
              </h3>
              <p className="text-gray-600 mb-6">
                {categoryFilter === "all"
                  ? "No items have been sold yet. Check back later."
                  : "No items match your current category filter."}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  className="px-4 py-2 bg-[#d4af37] text-white rounded-lg hover:bg-[#b8972e] transition-colors flex items-center"
                  onClick={refreshList}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh List
                </button>
                {categoryFilter !== "all" && (
                  <button
                    className="px-4 py-2 bg-white border border-[#d4af37] text-[#d4af37] rounded-lg hover:bg-[#d4af37] hover:text-white transition-colors"
                    onClick={() => setCategoryFilter("all")}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const currentImageIndex = currentImageIndices[product._id] || 0;
              const hasMultipleImages = product.images?.length > 1;
              
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative">
                    <div className="h-48 overflow-hidden">
                      {product.images?.length > 0 ? (
                        <>
                          <img
                            src={product.images[currentImageIndex]?.url || product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          {hasMultipleImages && (
                            <>
                              <button
                                onClick={(e) => handlePrevImage(product._id, e)}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                              >
                                <FaChevronLeft />
                              </button>
                              <button
                                onClick={(e) => handleNextImage(product._id, e)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                              >
                                <FaChevronRight />
                              </button>
                              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                                {product.images.map((_, idx) => (
                                  <div 
                                    key={idx}
                                    className={`h-1.5 w-1.5 rounded-full ${currentImageIndex === idx ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                          <FaTag className="text-green-500 text-4xl opacity-50" />
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                      SOLD
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {product.title}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded">
                        ${product.bids[0]?.amount?.toLocaleString() || "N/A"}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Seller Info with Label */}
                      <div className="flex items-center">
                        <FaUser className="text-[#d4af37] mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Seller</p>
                          <p className="text-gray-700 text-sm font-medium">
                            {product.seller?.name || "Unknown Seller"}
                          </p>
                        </div>
                      </div>

                     {/* Winner Info */}
                      <div className="flex items-center">
                        <FaTrophy className="text-[#d4af37] mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Winner</p>
                          <p className="text-gray-700 text-sm font-medium">
                            {product.bids[0].bidder?.name || "No Winner"}
                          </p>
                        </div>
                      </div>

                      {/* Category Info */}
                      <div className="flex items-center">
                        <FaTag className="text-[#d4af37] mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Category</p>
                          <p className="text-gray-700 text-sm font-medium capitalize">
                            {product.category || "Uncategorized"}
                          </p>
                        </div>
                      </div>

                      {/* End Time Info */}
                      <div className="flex items-center">
                        <FaClock className="text-[#d4af37] mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Ended</p>
                          <p className="text-gray-700 text-sm font-medium">
                            {new Date(product.endTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Final Price:</div>
                        <div className="text-lg font-bold text-green-600">
                          ${product.bids[0]?.amount?.toLocaleString() || "N/A"}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm text-gray-500">
                          Starting Price:
                        </div>
                        <div className="text-sm text-gray-700">
                          ${product.startingPrice?.toLocaleString() || "N/A"}
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
  );
};

export default SoldItems;