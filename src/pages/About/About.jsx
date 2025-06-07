import React from 'react';
import { FaUsers, FaShieldAlt, FaRocket, FaHandshake, FaChartLine, FaLock } from 'react-icons/fa';
import { MdOutlineVerifiedUser } from 'react-icons/md';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] text-[#2d3748] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="bg-[#d4af37]/10 text-[#d4af37] text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4 transform transition-transform duration-300 hover:scale-105">
            OUR STORY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-[#d4af37]">LuxeBid</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted online auction platform where value meets opportunity
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Mission and Values */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaRocket className="text-[#d4af37] mr-3 transition-transform duration-300 group-hover:rotate-12" />
                Our Mission
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                To revolutionize the way people buy and sell by creating an auction platform that is reliable, fast, 
                and accessible to everyone. We're dedicated to building a marketplace where collectors, enthusiasts, 
                and sellers can connect through the thrill of bidding.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start group">
                  <div className="bg-[#d4af37]/10 p-3 rounded-full mr-4 transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-110">
                    <FaUsers className="text-[#d4af37] text-xl transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-[#d4af37] transition-colors duration-300">For Collectors</h3>
                    <p className="transition-colors duration-300 group-hover:text-[#2d3748]">Discover unique items and experience the thrill of winning auctions</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-[#d4af37]/10 p-3 rounded-full mr-4 transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-110">
                    <MdOutlineVerifiedUser className="text-[#d4af37] text-xl transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-[#d4af37] transition-colors duration-300">For Sellers</h3>
                    <p className="transition-colors duration-300 group-hover:text-[#2d3748]">Reach thousands of potential buyers and maximize your returns</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaChartLine className="text-[#d4af37] mr-3 transition-transform duration-300 group-hover:rotate-12" />
                Our Journey
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                Founded in 2023, LuxeBid started as a passion project by a team of collectors and tech enthusiasts. 
                Frustrated by the limitations of existing auction platforms, we set out to create a solution that 
                combines the excitement of live auctions with the convenience of online shopping.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Today, we've grown into a trusted marketplace with thousands of active users, featuring rare collectibles, 
                luxury items, and unique treasures from around the world. Our journey continues as we innovate to bring 
                you the best auction experience possible.
              </p>
            </div>
          </div>
          
          {/* Right Column - Values */}
          <div>
            <div className="bg-gradient-to-br from-[#2d3748] to-[#1a202c] text-white rounded-2xl shadow-lg p-8 mb-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-6">Our Values</h2>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-[#d4af37] p-2 rounded-full mr-4 transition-all duration-300 group-hover:bg-white group-hover:scale-110">
                    <FaShieldAlt className="text-white transition-colors duration-300 group-hover:text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 transition-colors duration-300 group-hover:text-[#d4af37]">Security</h3>
                    <p className="text-blue-100 transition-colors duration-300 group-hover:text-white">JWT-based authentication and secure storage for your data</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-[#d4af37] p-2 rounded-full mr-4 transition-all duration-300 group-hover:bg-white group-hover:scale-110">
                    <FaHandshake className="text-white transition-colors duration-300 group-hover:text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 transition-colors duration-300 group-hover:text-[#d4af37]">Transparency</h3>
                    <p className="text-blue-100 transition-colors duration-300 group-hover:text-white">Every product, bid, and transaction is clearly tracked</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-[#d4af37] p-2 rounded-full mr-4 transition-all duration-300 group-hover:bg-white group-hover:scale-110">
                    <FaLock className="text-white transition-colors duration-300 group-hover:text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 transition-colors duration-300 group-hover:text-[#d4af37]">Fairness</h3>
                    <p className="text-blue-100 transition-colors duration-300 group-hover:text-white">Equal opportunity for all participants in every auction</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
              <p className="mb-4">
                Our platform is built using cutting-edge technologies:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f8f9fa] p-4 rounded-lg border border-transparent transition-all duration-300 hover:border-[#d4af37] hover:bg-[#fdf7e8] hover:shadow-md">
                  <div className="font-semibold text-[#d4af37]">Frontend</div>
                  <div>React.js, Tailwind CSS</div>
                </div>
                <div className="bg-[#f8f9fa] p-4 rounded-lg border border-transparent transition-all duration-300 hover:border-[#d4af37] hover:bg-[#fdf7e8] hover:shadow-md">
                  <div className="font-semibold text-[#d4af37]">Backend</div>
                  <div>Node.js, Express.js</div>
                </div>
                <div className="bg-[#f8f9fa] p-4 rounded-lg border border-transparent transition-all duration-300 hover:border-[#d4af37] hover:bg-[#fdf7e8] hover:shadow-md">
                  <div className="font-semibold text-[#d4af37]">Database</div>
                  <div>MongoDB</div>
                </div>
                <div className="bg-[#f8f9fa] p-4 rounded-lg border border-transparent transition-all duration-300 hover:border-[#d4af37] hover:bg-[#fdf7e8] hover:shadow-md">
                  <div className="font-semibold text-[#d4af37]">Authentication</div>
                  <div>JWT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Leadership</h2>
            <p className="max-w-2xl mx-auto">
              Meet the passionate team behind LuxeBid's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Founder & CEO" },
              { name: "Sarah Williams", role: "Head of Product" },
              { name: "Michael Chen", role: "CTO" },
            ].map((person, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
              >
                <div className="h-48 bg-gradient-to-r from-[#d4af37] to-[#b8972e] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 text-center -mt-16">
                  <div className="w-32 h-32 mx-auto bg-gray-200 border-4 border-white rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:border-[#d4af37]">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-4 group-hover:text-[#d4af37] transition-colors duration-300">{person.name}</h3>
                  <p className="text-[#d4af37]">{person.role}</p>
                  <p className="mt-3 text-gray-600 group-hover:text-[#2d3748] transition-colors duration-300">
                    Passionate about creating exceptional user experiences in the auction space
                  </p>
                  <div className="mt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-gray-400 hover:text-[#d4af37] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-[#d4af37] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#2d3748] to-[#1a202c] text-white rounded-2xl shadow-lg p-12 text-center transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Become part of thousands of collectors and sellers on LuxeBid
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#d4af37] hover:bg-[#b8972e] text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Start Bidding
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white/10 transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Become a Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;