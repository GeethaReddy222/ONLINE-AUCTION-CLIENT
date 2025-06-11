import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
  
import {
  FaShoppingCart,
  FaClock,
  FaUser,
  FaTag,
  FaArrowLeft,
  FaBan,
  FaExclamationTriangle
} from 'react-icons/fa';
import CustomerSidebar from './CustomerSidebar';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userHasBid, setUserHasBid] = useState(false); // ADDED: Track user bid status
  const [currentUserId, setCurrentUserId] = useState(null); // ADDED: Current user ID

  useEffect(() => {
    // Get current user ID from token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.userId);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }

    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Sort bids in descending order
        const sortedBids = [...response.data.bids].sort(
          (a, b) => b.amount - a.amount
        );
        
        setProduct(response.data.product);
        setBids(sortedBids);

        // Check if current user has already bid
        if (currentUserId) {
          const hasBid = sortedBids.some(
            bid => bid.bidder?._id === currentUserId
          );
          setUserHasBid(hasBid);
        }
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, currentUserId]); // Added currentUserId dependency

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      await axios.post(
        `http://localhost:5000/api/products/bids/${productId}`,
        { amount: bidAmount, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Bid placed successfully!');
      setBidAmount('');
      setUserHasBid(true); // Mark user as having bid
      setError(''); // Clear any previous errors

      // Refresh bids
      const response = await axios.get(
        `http://localhost:5000/api/products/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const sortedBids = [...response.data.bids].sort(
        (a, b) => b.amount - a.amount
      );
      setBids(sortedBids);
    } catch (err) {
      // Handle existing bid error specifically
      if (err.response?.data?.message.includes("already placed a bid")) {
        setError(`You've already bid on this product`);
        setUserHasBid(true);
      } else {
        setError(err.response?.data?.message || 'Failed to place bid');
      }
      setSuccess('');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <CustomerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !product) {
    return (
      <div className="flex h-screen bg-gray-50">
        <CustomerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
            <p className="font-medium">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="flex h-screen bg-gray-50">
        <CustomerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-md">
            <p className="font-medium">Product not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Customer Sidebar */}
      <CustomerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="mb-6">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden bg-blue-600 text-white p-2 rounded-lg mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" />
            Back to Products
          </button>
        </div>

        {/* User Bid Status Banner */}
        {userHasBid && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex items-start">
              <FaBan className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-yellow-700 font-medium">
                  You've already placed a bid on this product
                </p>
                <p className="text-yellow-600 text-sm mt-1">
                  You can only bid once per item. Check your bids in the dashboard.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="lg:pr-8">
              {product.imageUrl ? (
                <div className="rounded-xl overflow-hidden h-96">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl h-96 flex items-center justify-center">
                  <FaTag className="text-blue-500 text-6xl opacity-50" />
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                </div>
                
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <FaUser className="text-blue-500 mr-2" />
                  <span className="text-gray-600">
                    Seller: {product.seller?.name || 'Unknown'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <FaTag className="text-blue-500 mr-2" />
                  <span className="text-gray-600">Category: {product.category}</span>
                </div>
                
                <div className="flex items-center">
                  <FaClock className="text-blue-500 mr-2" />
                  <span className="text-gray-600">
                    Listed: {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    product.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-gray-600">
                    Status: {product.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">${product.startingPrice}</h3>
                    <p className="text-gray-600">Starting Price</p>
                  </div>
                  
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-gray-900">
                      ${bids.length > 0 ? bids[0].amount : product.startingPrice}
                    </h3>
                    <p className="text-gray-600">Current Bid</p>
                  </div>
                </div>
              </div>
              
              {/* Bid Form - Only shown if user hasn't bid */}
              {!userHasBid ? (
                <form onSubmit={handleBidSubmit} className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                        Place Your Bid
                      </label>
                      <input
                        type="number"
                        id="bidAmount"
                        min={bids.length > 0 ? bids[0].amount + 1 : product.startingPrice + 1}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Min. bid: $${bids.length > 0 ? bids[0].amount + 1 : product.startingPrice + 1}`}
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <FaShoppingCart className="mr-2" />
                        Place Bid
                      </button>
                    </div>
                  </div>
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                  {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
                </form>
              ) : (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-8">
                  <div className="flex items-center">
                    <FaExclamationTriangle className="text-blue-500 mr-3" />
                    <p className="text-blue-700">
                      You've already placed a bid on this product
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Bids Section */}
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bid History</h2>
            
            {bids.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <FaClock className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bids yet</h3>
                <p className="text-gray-600">Be the first to place a bid on this item!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bidder
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bids.map((bid, index) => (
                      <tr 
                        key={index} 
                        className={
                          index === 0 ? "bg-green-50" : 
                          currentUserId && bid.bidder?._id === currentUserId ? "bg-blue-50" : ""
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaUser className="text-gray-400 mr-2" />
                            <div className="text-sm font-medium text-gray-900">
                              {bid.bidder?.name || 'Unknown Bidder'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          ${bid.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(bid.time).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            index === 0 
                              ? 'bg-green-100 text-green-800' 
                              : currentUserId && bid.bidder?._id === currentUserId
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {index === 0 
                              ? 'Winning' 
                              : currentUserId && bid.bidder?._id === currentUserId
                                ? 'Your Bid'
                                : 'Outbid'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;