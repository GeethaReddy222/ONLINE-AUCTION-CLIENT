// src/pages/ActiveProducts.js
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaStar, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import axios from 'axios';

const ActiveProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  

  useEffect(() => {
  const fetchActiveProducts = async () => {
    try {
      const token = localStorage.getItem('token');

      //Update approved products to active
      await axios.patch('http://localhost:5000/api/products/update-active', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //Fetch active products
      const response = await axios.get('http://localhost:5000/api/products/active-products', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  fetchActiveProducts();
}, []);

  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, sortOption, products]);
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'food', name: 'Food & Beverage' },
    { id: 'accessories', name: 'Accessories' }
  ];
  
  const getImageClass = (imageName) => {
    const imageClasses = {
      headphones: "bg-gradient-to-br from-gray-800 to-gray-600",
      bottle: "bg-gradient-to-br from-blue-100 to-blue-300",
      yogamat: "bg-gradient-to-br from-purple-200 to-purple-400",
      fitnesstracker: "bg-gradient-to-br from-gray-700 to-gray-900",
      tshirt: "bg-gradient-to-br from-blue-200 to-blue-400",
      coffee: "bg-gradient-to-br from-amber-700 to-amber-900",
      laptopbag: "bg-gradient-to-br from-yellow-700 to-yellow-900",
      charger: "bg-gradient-to-br from-gray-400 to-gray-600"
    };
    
    return imageClasses[imageName] || "bg-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Active Products</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse our collection of premium products
          </p>
        </div>
        
        {/* Filters and Search */}
        <div className="mb-10 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="appearance-none block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <select
                className="block w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-4 bg-gray-100 rounded-full">
              <FaSearch className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product,index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
                  product.isFeatured ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {/* Featured badge */}
                {product.isFeatured && (
                  <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    FEATURED
                  </div>
                )}
                
                {/* Product Image */}
                <div className={`h-48 flex items-center justify-center relative ${getImageClass(product.image)}`}>
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
                      <FaHeart className="text-gray-600 hover:text-red-500" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
                      <FaEye className="text-gray-600 hover:text-blue-500" />
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">${product.staringPrice}</span>
                      
                    </div>
                    
                    
                  </div>
                  
                  
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Results count */}
        <div className="mt-8 text-center text-gray-500">
          Showing {filteredProducts.length} of {products.length} active products
        </div>
      </div>
    </div>
  );
};

export default ActiveProducts;