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
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-[#d4af37] to-[#b8972e] hover:from-[#b8972e] hover:to-[#9c7c24] text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
              >
                Start Bidding <FaArrowRight className="ml-2" />
              </button>
              <button 
                onClick={() => navigate('/auctions')}
                className="bg-white border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#faf5e6] font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Explore Auctions
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto relative z-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Featured Auction</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`${i < 4 ? 'text-[#d4af37]' : 'text-gray-300'} ml-1`} />
                  ))}
                </div>
              </div>
              
              <div 
                className="relative h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/auction/${featuredAuctions[currentSlide].id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-[#d4af37] text-white text-xs font-semibold py-1 px-2 rounded transform transition-transform group-hover:scale-105">
                  {featuredAuctions[currentSlide].category}
                </div>
                <div className="absolute bottom-4 left-4 text-white transition-transform group-hover:-translate-y-2">
                  <h4 className="text-xl font-bold">{featuredAuctions[currentSlide].title}</h4>
                  <p className="text-lg font-semibold">${featuredAuctions[currentSlide].currentBid.toLocaleString()}</p>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 text-[#2d3748] py-1 px-3 rounded-full font-medium text-sm">
                    View Auction
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mb-4">
                <div className="flex items-center text-gray-600">
                  <FaHeart className="text-red-500 mr-1" />
                  <span className="text-sm">{featuredAuctions[currentSlide].bids} bids</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaEye className="text-blue-500 mr-1" />
                  <span className="text-sm">{featuredAuctions[currentSlide].watchers} watchers</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-[#f8f9fa] rounded-lg py-2 text-center transition-all duration-300 hover:bg-[#d4af37]/10 hover:shadow-inner">
                  <div className="text-lg font-bold">{timeLeft.days}</div>
                  <div className="text-xs text-gray-500">DAYS</div>
                </div>
                <div className="bg-[#f8f9fa] rounded-lg py-2 text-center transition-all duration-300 hover:bg-[#d4af37]/10 hover:shadow-inner">
                  <div className="text-lg font-bold">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-500">HOURS</div>
                </div>
                <div className="bg-[#f8f9fa] rounded-lg py-2 text-center transition-all duration-300 hover:bg-[#d4af37]/10 hover:shadow-inner">
                  <div className="text-lg font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-500">MIN</div>
                </div>
                <div className="bg-[#f8f9fa] rounded-lg py-2 text-center transition-all duration-300 hover:bg-[#d4af37]/10 hover:shadow-inner">
                  <div className="text-lg font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-500">SEC</div>
                </div>
              </div>
              
              <button 
                className="w-full bg-gradient-to-r from-[#2d3748] to-[#1a202c] hover:from-[#1a202c] hover:to-[#0d1117] text-white font-semibold py-3 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                onClick={() => navigate(`/auction/${featuredAuctions[currentSlide].id}`)}
              >
                Place Bid
              </button>
              
              <div className="flex justify-center mt-4">
                <button 
                  onClick={handlePrevSlide}
                  className="p-2 rounded-full hover:bg-gray-100 mx-1 transition-colors duration-300"
                >
                  <FaArrowRight className="transform rotate-180" />
                </button>
                {featuredAuctions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                      i === currentSlide ? 'bg-[#d4af37] scale-125' : 'bg-gray-300 hover:bg-[#d4af37]/50'
                    }`}
                  />
                ))}
                <button 
                  onClick={handleNextSlide}
                  className="p-2 rounded-full hover:bg-gray-100 mx-1 transition-colors duration-300"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 -left-10 w-32 h-32 rounded-full bg-[#d4af37]/10 z-0 animate-pulse"></div>
            <div className="absolute bottom-10 -right-10 w-40 h-40 rounded-full bg-[#2d3748]/10 z-0 animate-pulse"></div>
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
              { name: 'Collectibles', icon: <FaTrophy className="text-2xl" />, count: 36, color: '#38a169' },
              { name: 'Art & Antiques', icon: <BsBrush className="text-2xl" />, count: 15, color: '#9f7aea' },
              { name: 'Fashion', icon: <GiPriceTag className="text-2xl" />, count: 28, color: '#ed64a6' },
              { name: 'Home & Garden', icon: <FaHome className="text-2xl" />, count: 22, color: '#0bc5ea' },
              { name: 'Sports', icon: <FaTrophy className="text-2xl" />, count: 19, color: '#dd6b20' },
              { name: 'Watches', icon: <FaClock className="text-2xl" />, count: 14, color: '#319795' },
              { name: 'Gaming', icon: <TbDeviceGamepad2 className="text-2xl" />, count: 31, color: '#805ad5' }
            ].map((category, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:-translate-y-2"
                onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
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

      {/* Testimonials */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-[#d4af37]/10 text-[#d4af37] text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4 transform transition-transform duration-300 hover:scale-105">
              HAPPY BIDDERS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover why thousands of collectors trust PrimeBid for premium auctions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Art Collector",
                comment: "I've acquired three valuable pieces through LuxeBid. The authentication process gives me confidence in every purchase.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Watch Enthusiast",
                comment: "The real-time bidding experience is exhilarating. I finally got my grail watch after months of searching!",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Jewelry Designer",
                comment: "Selling my collection through LuxeBid exceeded my expectations. The platform is professional and the audience is serious.",
                rating: 4
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className="bg-[#f8f9fa] rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#d4af37]/30"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar 
                      key={starIndex} 
                      className={`${starIndex < testimonial.rating ? 'text-[#d4af37]' : 'text-gray-300'} mr-1`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
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
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-[#d4af37] to-[#b8972e] hover:from-[#b8972e] hover:to-[#9c7c24] text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Create Free Account
            </button>
            <button 
              onClick={() => navigate('/login')}
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