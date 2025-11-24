import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <img
                alt="EchOo."
                src="/src/assets/images/Echoo-transparent.png"
                className="h-7 w-auto"
              />
              <span className="text-xl font-semibold text-gray-900">echOo</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Innovative technology for a connected future. 
              Experience the next generation of smart devices.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/iphone-air" 
                  className={`text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm ${
                    location.pathname === '/iphone-air' ? 'text-gray-900 font-medium' : ''
                  }`}
                >
                  iPhone Air
                </Link>
              </li>
              <li>
                <Link 
                  to="/iphone-pro" 
                  className={`text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm ${
                    location.pathname === '/iphone-pro' ? 'text-gray-900 font-medium' : ''
                  }`}
                >
                  iPhone Pro
                </Link>
              </li>
              <li>
                <Link 
                  to="/accessories" 
                  className={`text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm ${
                    location.pathname === '/accessories' ? 'text-gray-900 font-medium' : ''
                  }`}
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link 
                  to="/compare" 
                  className={`text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm ${
                    location.pathname === '/compare' ? 'text-gray-900 font-medium' : ''
                  }`}
                >
                  Compare
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/support" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/warranty" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Warranty
                </Link>
              </li>
              <li>
                <Link 
                  to="/repair" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Repair Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  About echOo
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/investors" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link 
                  to="/news" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-gray-900 font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-600 text-sm">Get the latest news and offers from echOo</p>
            </div>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm min-w-64"
              />
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 echOo Inc. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm"
              >
                Terms of Use
              </Link>
              <Link 
                to="/sitemap" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm"
              >
                Site Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;