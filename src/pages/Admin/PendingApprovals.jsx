import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaSearch,
  FaUser,
  FaTimes,
  FaFilter,
  FaTag,
  FaClock,
  FaCheck,
  FaExclamationTriangle
} from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const PendingApprovals = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/pending-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPendingProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch pending products');
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  const handleAction = async (productId, action) => {
    setActionLoadingId(productId);
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/admin/pending-approvals/${productId}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update product status');
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredProducts = pendingProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const refreshList = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/pending-products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch pending products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading luxury items for approval...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
            <p className="font-medium">Error: {error}</p>
            <p className="mt-2 text-sm">Please try again later or contact support</p>
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
              <h1 className="text-2xl md:text-3xl font-bold text-[#2d3748]">Pending Approvals</h1>
              <p className="text-[#718096] mt-1">
                Review and approve items for the PrimeBid marketplace
              </p>
            </div>
            
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden bg-[#d4af37] text-white p-2 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex gap-2">
              <button 
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${filter === 'all' ? 'bg-[#d4af37] text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('all')}
              >
                <FaFilter className="mr-2" /> All Items
              </button>
              
              <button 
                className="flex items-center px-4 py-2 bg-white border border-[#d4af37] text-[#d4af37] rounded-lg hover:bg-[#d4af37] hover:text-white transition-colors"
                onClick={refreshList}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Approvals</h3>
              <p className="text-gray-600 mb-6">
                All items have been reviewed and approved. Check back later for new submissions.
              </p>
              <div className="flex justify-center gap-3">
                <button 
                  className="px-4 py-2 bg-[#d4af37] text-white rounded-lg hover:bg-[#b8972e] transition-colors flex items-center"
                  onClick={refreshList}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh List
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative">
                  <div className="h-48 overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                        <FaTag className="text-amber-500 text-4xl opacity-50" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
                    PENDING
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{product.title}</h3>
                    <span className="bg-[#d4af37] bg-opacity-10 text-[#b8972e] text-sm font-semibold px-2 py-1 rounded">
                      ${product.startingPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center">
                      <FaUser className="text-[#d4af37] mr-2" />
                      <span className="text-gray-700 text-sm">{product.seller?.name || 'Unknown Seller'}</span>
                    </div>
                    <div className="flex items-center">
                      <FaTag className="text-[#d4af37] mr-2" />
                      <span className="text-gray-700 text-sm capitalize">{product.category}</span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <FaClock className="text-[#d4af37] mr-2" />
                      <span className="text-gray-700 text-sm">
                        Submitted: {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-3 border-t border-gray-100">
                    <button
                      disabled={actionLoadingId === product._id}
                      onClick={() => handleAction(product._id, 'approve')}
                      className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${
                        actionLoadingId === product._id 
                          ? 'bg-green-500 opacity-70 cursor-wait' 
                          : 'bg-green-600 hover:bg-green-700'
                      } text-white font-medium`}
                    >
                      {actionLoadingId === product._id ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FaCheck className="mr-2" />
                      )}
                      Approve
                    </button>
                    
                    <button
                      disabled={actionLoadingId === product._id}
                      onClick={() => handleAction(product._id, 'reject')}
                      className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${
                        actionLoadingId === product._id 
                          ? 'bg-red-500 opacity-70 cursor-wait' 
                          : 'bg-red-600 hover:bg-red-700'
                      } text-white font-medium`}
                    >
                      <FaTimes className="mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default PendingApprovals;