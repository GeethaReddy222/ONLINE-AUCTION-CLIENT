import React, { useState } from 'react';
import axios from 'axios';
import CustomerSidebar from './CustomerSidebar';
import { FaBars } from 'react-icons/fa';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'books',
    startTime: '',
    endTime: '',
    startingPrice: '',
    images: [], // store image URLs as comma separated input
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = ['books', 'electronics', 'jewelry', 'vehicles', 'other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Prepare images array from comma separated URLs (basic handling)
    const imagesArray = formData.images
      .split(',')
      .map(url => url.trim())
      .filter(url => url)
      .map((url, idx) => ({ url, isPrimary: idx === 0 }));

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        'http://localhost:4000/customer/products',
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          startTime: formData.startTime,
          endTime: formData.endTime,
          startingPrice: Number(formData.startingPrice),
          images: imagesArray,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess('Product submitted successfully and is pending approval.');
      setFormData({
        title: '',
        description: '',
        category: 'books',
        startTime: '',
        endTime: '',
        startingPrice: '',
        images: '',
      });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to submit product. Please try again.'
      );
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 text-2xl"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-blue-600 font-bold text-lg">Add Product</h1>
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
            className="fixed inset-0 bg-blue-gray-800 bg-opacity-30 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white p-8 rounded shadow"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Add Product for Auction</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                maxLength={100}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Description</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={2000}
                required
                rows={5}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              ></textarea>
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Category</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Start Time</span>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">End Time</span>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Starting Price ($)</span>
              <input
                type="number"
                name="startingPrice"
                min="0.01"
                step="0.01"
                value={formData.startingPrice}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">
                Images (Enter URLs separated by commas)
              </span>
              <input
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Product'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
