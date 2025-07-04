import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  FaClock,
  FaUser,
  FaTag,
  FaArrowLeft,
  FaBan,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaTrophy,
  FaTrash,
  FaEdit
} from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';

const AdminProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [auctionStatus, setAuctionStatus] = useState('active');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const productData = response.data.product;
        const sortedBids = [...productData.bids].sort(
          (a, b) => b.amount - a.amount
        );
        
        setProduct(productData);
        setBids(sortedBids);

        // Process images
        let imageArray = [];
        if (productData.images?.length > 0) {
          imageArray = [...productData.images];
          const primaryIndex = imageArray.findIndex(img => img.isPrimary);
          if (primaryIndex !== -1) {
            const primaryImage = imageArray.splice(primaryIndex, 1)[0];
            imageArray.unshift(primaryImage);
          }
        } else if (productData.imageUrl) {
          imageArray = [{ url: productData.imageUrl, isPrimary: true }];
        }
        setImages(imageArray);
        
        // Determine auction status
        const now = new Date();
        const endTime = new Date(productData.endTime);
        
        if (now > endTime) {
          if (sortedBids.length > 0) {
            setAuctionStatus('sold');
            setWinner(sortedBids[0].bidder);
          } else {
            setAuctionStatus('unsold');
          }
        } else {
          setAuctionStatus('active');
        }
      } catch (err) {
        setError('Failed to fetch product details');
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleDeleteProduct = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `http://localhost:5000/api/products/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate('/admin/products');
      } catch (err) {
        setError('Failed to delete product');
        console.error("Delete error:", err);
      }
    }
  };

 

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <FaBan className="text-yellow-500 mr-3" />
              <p className="text-yellow-700 font-medium">Product not found</p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <FaArrowLeft className="mr-2" /> Back to Products
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <button
          onClick={() => navigate('/product/active-products')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </button>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {auctionStatus === 'sold' && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex items-start">
              <FaTrophy className="text-green-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-green-700 font-medium">
                  Auction Ended - Sold to {winner?.name || 'the highest bidder'}
                </p>
                <p className="text-green-600 text-sm mt-1">
                  This auction has ended successfully with a winning bid.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {auctionStatus === 'unsold' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex items-start">
              <FaExclamationTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-yellow-700 font-medium">
                  Auction Ended - Unsold
                </p>
                <p className="text-yellow-600 text-sm mt-1">
                  This auction ended without any bids.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div className="relative">
              {images.length > 0 ? (
                <>
                  <div className="rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center" style={{ height: '400px' }}>
                    <img
                      src={images[currentImageIndex]?.url}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                      >
                        <FaChevronRight />
                      </button>
                      <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
                        {images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                              index === currentImageIndex
                                ? 'border-blue-500'
                                : 'border-transparent'
                            }`}
                          >
                            <img
                              src={img.url}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center" style={{ height: '400px' }}>
                  <FaTag className="text-gray-400 text-4xl" />
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {product.category}
                </span>
                
              </div>
              
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {product.description || 'No description available'}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <FaClock className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Start Time</p>
                    <p className="text-gray-900">
                      {new Date(product.startTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">End Time</p>
                    <p className="text-gray-900">
                      {new Date(product.endTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    auctionStatus === 'active' 
                      ? 'bg-green-500' 
                      : auctionStatus === 'sold'
                        ? 'bg-purple-500'
                        : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="text-sm text-gray-600">Auction Status</p>
                    <p className="text-gray-900 font-medium">
                      {auctionStatus.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaUser className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Seller</p>
                    <p className="text-gray-900">
                      {product.seller?.name || 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      ${product.startingPrice.toFixed(2)}
                    </h3>
                    <p className="text-gray-600">Starting Price</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      ${bids.length > 0 ? bids[0].amount.toFixed(2) : product.startingPrice.toFixed(2)}
                    </h3>
                    <p className="text-gray-600">
                      {auctionStatus === 'sold' ? 'Winning Bid' : 'Current Bid'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {bids.length}
                    </h3>
                    <p className="text-gray-600">Total Bids</p>
                  </div>
                </div>
                
                {auctionStatus === 'sold' && winner && (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center">
                    <FaTrophy className="text-yellow-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Winner</p>
                      <p className="font-medium">{winner.name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Bids Section */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Bid History</h2>
              <p className="text-gray-600">
                Showing {bids.length} bids
              </p>
            </div>
            
            {bids.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <FaClock className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bids</h3>
                <p className="text-gray-600">
                  {auctionStatus === 'active'
                    ? "No bids placed on this item yet"
                    : "This auction received no bids"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                          index === 0 && auctionStatus === 'sold' 
                            ? "bg-purple-50" 
                            : index === 0 
                              ? "bg-green-50" 
                              : ""
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaUser className="text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {bid.bidder?.name || 'Unknown Bidder'}
                              </div>
                              
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          ${bid.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(bid.time).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            index === 0 && auctionStatus === 'sold'
                              ? 'bg-purple-100 text-purple-800'
                              : index === 0 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {index === 0 && auctionStatus === 'sold'
                              ? 'Winner' 
                              : index === 0 
                                ? 'Winning' 
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

export default AdminProductDetail;