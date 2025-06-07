import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from './CustomerSidebar';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';

export default function CustomerUpdateProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    address: '',
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Not authenticated');
          setLoading(false);
          navigate('/login');
          return;
        }

        const res = await axios.get('http://localhost:4000/customer/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setCustomerData({
            username: res.data.username || '',
            email: res.data.email || '',
            contactNumber: res.data.contactNumber || '',
            address: res.data.address || '',
          });
        }
      } catch (error) {
        console.error('Error fetching customer data', error);
        setError('Failed to load profile data');
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [navigate]);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      const res = await axios.put(
        'http://localhost:4000/customer/update',
        customerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        setSuccess('Profile updated successfully!');
        setTimeout(() => navigate('/customer/profile'), 1500);
      }
    } catch (error) {
      console.error('Update error:', error);

      if (error.response) {
        if (error.response.status === 401) {
          setError('Session expired. Please login again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else if (error.response.status === 403) {
          setError('You do not have permission to perform this action');
        } else {
          setError(error.response.data?.message || 'Error updating profile');
        }
      } else if (error.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !customerData.username) {
    return (
      <div className="text-center mt-20 text-lg text-gray-700">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center sticky top-0 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 text-2xl"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-xl font-semibold text-blue-700">Update Profile</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-600 shadow-md transform
            md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <CustomerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-blue-gray-800 bg-opacity-30 backdrop-blur-sm z-25 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto flex justify-center items-start">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
              Update Profile
            </h2>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-2 bg-green-100 text-green-700 rounded" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={customerData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={customerData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={customerData.contactNumber}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  title="10 digit phone number"
                  autoComplete="tel"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={customerData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 rounded font-semibold transition ${
                  loading
                    ? 'bg-blue-300 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
