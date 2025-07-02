import React from 'react';
import {
  FaGavel
} from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 bg-[#1a202c] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-[#2d3748] rounded-full flex items-center justify-center mr-3">
                <FaGavel className="text-[#d4af37] text-xl" />
              </div>
              <h1 className="text-2xl font-bold">Prime<span className="text-[#d4af37]">Bid</span></h1>
            </div>
            <p className="text-gray-400 mb-4">
              Premium online auction platform for exclusive items and collectibles.
            </p>
            
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Sitemap</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          &copy; {new Date().getFullYear()} PrimeBid. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;
