import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaGavel, FaSearch, FaShieldAlt, FaClock, FaUser, FaArrowRight, 
  FaStar, FaTrophy, FaHeart, FaEye, FaChartLine,FaHome
} from 'react-icons/fa';
import { MdOutlineTimer } from 'react-icons/md';
import { GiPriceTag, GiDiamondRing } from 'react-icons/gi';
import { RiCarFill } from 'react-icons/ri';
import { BsBrush } from 'react-icons/bs';
import { TbDeviceGamepad2 } from 'react-icons/tb';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hoveredCategory, setHoveredCategory] = useState(null);
  
  // Featured auctions with countdown timers
  const featuredAuctions = [
    {
      id: 1,
      title: "Vintage Rolex Submariner",
      category: "Jewelry",
      currentBid: 12500,
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      bids: 24,
      watchers: 143
    },
    {
      id: 2,
      title: "Signed First Edition Harry Potter",
      category: "Books",
      currentBid: 8200,
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      bids: 18,
      watchers: 98
    },
    {
      id: 3,
      title: "1967 Ford Mustang",
      category: "Vehicles",
      currentBid: 42500,
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      bids: 32,
      watchers: 215
    }
  ];
  
  // Calculate time left for featured auctions
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const auction = featuredAuctions[currentSlide];
      const difference = auction.endTime - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [currentSlide]);
  
  // Auto rotate featured auctions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredAuctions.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Navigation handlers
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredAuctions.length - 1 : prev - 1));
  };
  
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredAuctions.length - 1 ? 0 : prev + 1));
  };
  
  // Hover effects for categories
  const handleCategoryHover = (index) => {
    setHoveredCategory(index);
  };
  
  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] text-[#2d3748]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="bg-[#d4af37] text-white text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4 transform transition-transform duration-300 hover:scale-105">
              Premium Auctions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover, Bid & Win <span className="text-[#d4af37]">Exclusive</span> Items
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              Join thousands of collectors and enthusiasts in our premium online auctions. Find rare collectibles, luxury items, and unique treasures.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                className="bg-gradient-to-r from-[#d4af37] to-[#b8972e] hover:from-[#b8972e] hover:to-[#9c7c24] text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
              >
                Start Bidding <FaArrowRight className="ml-2" />
              </button>
              <button 
                className="bg-white border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#faf5e6] font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Explore Auctions
              </button>
            </div>
          </div>
           
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-[#d4af37]/10 text-[#d4af37] text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4 transform transition-transform duration-300 hover:scale-105">
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Auction Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a seamless and secure platform for both buyers and sellers to participate in exclusive auctions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaGavel className="text-3xl text-[#d4af37] group-hover:text-white transition-colors" />,
                title: 'Real-time Bidding',
                desc: 'Compete with live updates during active auctions'
              }, {
                icon: <FaSearch className="text-3xl text-[#d4af37] group-hover:text-white transition-colors" />,
                title: 'Verified Items',
                desc: 'All items are authenticated by our experts'
              }, {
                icon: <FaShieldAlt className="text-3xl text-[#d4af37] group-hover:text-white transition-colors" />,
                title: 'Secure Transactions',
                desc: 'Protected payments and verified users'
              }, {
                icon: <FaClock className="text-3xl text-[#d4af37] group-hover:text-white transition-colors" />,
                title: 'Timed Auctions',
                desc: 'Automated start and end times for every listing'
              }
            ].map(({ icon, title, desc }, i) => (
              <div 
                key={i} 
                className="p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 hover:border-[#d4af37]/30"
              >
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6 group-hover:bg-[#d4af37] transition-colors">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#d4af37] transition-colors">{title}</h3>
                <p className="text-gray-600 group-hover:text-[#2d3748] transition-colors">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 px-6 md:px-12 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-[#d4af37]/10 text-[#d4af37] text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4 transform transition-transform duration-300 hover:scale-105">
              BROWSE CATEGORIES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Auction Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular categories featuring exclusive items and collectibles.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Jewelry', icon: <GiDiamondRing className="text-2xl" />, count: 24, color: '#d4af37' },
              { name: 'Electronics', icon: <MdOutlineTimer className="text-2xl" />, count: 18, color: '#4299e1' },
              { name: 'Vehicles', icon: <RiCarFill className="text-2xl" />, count: 12, color: '#e53e3e' },
              
              { name: 'Art & Antiques', icon: <BsBrush className="text-2xl" />, count: 15, color: '#9f7aea' },
              { name: 'Fashion', icon: <GiPriceTag className="text-2xl" />, count: 28, color: '#ed64a6' },
              { name: 'Home & Garden', icon: <FaHome className="text-2xl" />, count: 22, color: '#0bc5ea' },
              { name: 'Sports', icon: <FaTrophy className="text-2xl" />, count: 19, color: '#dd6b20' },
              { name: 'Watches', icon: <FaClock className="text-2xl" />, count: 14, color: '#319795' },
  
            ].map((category, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300  group border border-gray-100 hover:-translate-y-2"
              
                onMouseEnter={() => handleCategoryHover(i)}
                onMouseLeave={handleCategoryLeave}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors"
                  style={{ 
                    backgroundColor: hoveredCategory === i ? category.color : '#d4af37/10',
                    transform: hoveredCategory === i ? 'scale(1.1) rotate(5deg)' : 'scale(1)'
                  }}
                >
                  <span 
                    className="transition-colors" 
                    style={{ color: hoveredCategory === i ? 'white' : '#d4af37' }}
                  >
                    {category.icon}
                  </span>
                </div>
                <h3 
                  className="font-semibold text-lg mb-1 transition-colors"
                  style={{ color: hoveredCategory === i ? category.color : '#2d3748' }}
                >
                  {category.name}
                </h3>
                <p 
                  className="text-sm transition-colors"
                  style={{ color: hoveredCategory === i ? category.color : '#718096' }}
                >
                  {category.count} active auctions
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-6 md:px-12 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-[#d4af37]/10 text-[#d4af37] text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4 transform transition-transform duration-300 hover:scale-105">
              GET STARTED
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How PrimeBid Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to participate in our premium auctions and find unique treasures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register & Verify',
                desc: 'Create your free account and complete verification',
                icon: <FaUser className="text-3xl" />
              },
              {
                step: '02',
                title: 'Browse Auctions',
                desc: 'Explore our curated selection of premium items',
                icon: <FaSearch className="text-3xl" />
              },
              {
                step: '03',
                title: 'Bid & Win',
                desc: 'Place your bids and win exclusive items',
                icon: <FaGavel className="text-3xl" />
              }
            ].map((step, i) => (
              <div 
                key={i} 
                className="p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37] text-white flex items-center justify-center text-lg font-bold mr-4 group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#d4af37] transition-colors">{step.title}</h3>
                <p className="text-gray-600 group-hover:text-[#2d3748] transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#2d3748] to-[#1a202c] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Auction?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Register today and start bidding on exclusive items from around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
             
              className="bg-gradient-to-r from-[#d4af37] to-[#b8972e] hover:from-[#b8972e] hover:to-[#9c7c24] text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Create Free Account
            </button>
            <button 
             
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Login to Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;