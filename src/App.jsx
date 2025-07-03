import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';

import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Login from './pages/Login/Login.jsx';

// Admin
import AdminRegister from './pages/Admin/AdminRegister.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminProfile from './pages/Admin/AdminProfile.jsx';
import PendingApprovals from './pages/Admin/PendingApprovals.jsx';
import ActiveProducts from './pages/Admin/ActiveProducts';
import ProductDetail from './pages/Admin/ProductDetail';
// Customer
import CustomerRegister from './pages/Customer/CustomerRegister.jsx';
import CustomerDashboard from './pages/Customer/CustomerDashboard.jsx';
import CustomerProfile from './pages/Customer/CustomerProfile.jsx';
import AddProduct from './pages/Customer/AddProducts.jsx';
import MyProducts from './pages/Customer/MyProducts.jsx';
import MyBids from './pages/Customer/MyBids.jsx';
import BrowseProducts from './pages/Customer/BrowseProducts.jsx';
import ProductDetails from './pages/Customer/ProductDetails';

const App = () => {
  const location = useLocation();
  const authPaths = [
    '/login',
    '/adminregister',
    '/customerregister',
  ];
  const isAuthPage = authPaths.includes(location.pathname.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow pt-20">
        <Routes>
          {/* General */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/customerregister" element={<CustomerRegister />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/pending-approvals" element={<PendingApprovals />} />
          <Route path="/product/active-products" element={<ActiveProducts />} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* Customer Routes */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/add-product" element={<AddProduct />} />
          <Route path="/customer/my-products" element={<MyProducts />} />
          <Route path="/customer/browse-products" element={<BrowseProducts />} />
          <Route path="/customer/:productId" element={<ProductDetails />} />
          <Route path="/customer/my-bids" element={<MyBids />} />
         
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
