import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon, PhoneIcon, ChatBubbleLeftRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import your auth context
import SimpleFooter from '../components/SimpleFoot';

const EchooSupport = () => {
  const [supportData, setSupportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth context

  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/support-data');
        setSupportData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching support data:', error);
        setLoading(false);
      }
    };

    fetchSupportData();
  }, []);

  // Define feature routes with user condition
  const getFeatureRoutes = () => ({
    'get-support': '/get_support',
    'support-app': '/download',
    'my-support': user ? '/my_support' : '/sign_in',
    'echoo-care': '/echoo-care-plus'
  });

  const handleFeatureClick = (featureId) => {
    const routes = getFeatureRoutes();
    
    // For download, open in new tab
    if (featureId === 'support-app') {
      window.open(routes[featureId], '_blank');
    } else {
      navigate(routes[featureId]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Simple search implementation - you can enhance this
    const results = [];
    supportData?.supportCategories.forEach(category => {
      category.topics.forEach(topic => {
        if (topic.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            category: category.name,
            topic,
            icon: category.icon
          });
        }
      });
    });

    setSearchResults(results.slice(0, 8)); // Limit results
  };

  // Get dynamic button text for "My Support" feature
  const getButtonText = (feature) => {
    if (feature.id === 'my-support') {
      return user ? 'My Support Dashboard' : 'Sign in with your Echoo Account';
    }
    return feature.buttonText;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading Echoo Support...</div>
      </div>
    );
  }

  if (!supportData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load support data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-5xl font-dm-sans font-bold text-gray-900 text-center mb-4">
            Echoo Support
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Get help with your Echoo products and services
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search Support"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-lg max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{result.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{result.topic}</p>
                        <p className="text-sm text-gray-500">{result.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Support Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {supportData.supportCategories.map((category) => (
            <div
              key={category.id}
              className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="font-dm-sans font-semibold text-gray-900 text-lg">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Account & Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {supportData.accountSupport.map((item) => (
            <div
              key={item.id}
              className="p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-all cursor-pointer"
            >
              <h3 className="font-dm-sans font-semibold text-gray-900 text-lg mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
          {supportData.repairServices.map((item) => (
            <div
              key={item.id}
              className="p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-all cursor-pointer"
            >
              <h3 className="font-dm-sans font-semibold text-gray-900 text-lg mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
          {supportData.billingSupport.map((item) => (
            <div
              key={item.id}
              className="p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-all cursor-pointer"
            >
              <h3 className="font-dm-sans font-semibold text-gray-900 text-lg mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Support Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {supportData.supportFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-dm-sans font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <button 
                onClick={() => handleFeatureClick(feature.id)}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                {getButtonText(feature)}
              </button>
            </div>
          ))}
        </div>

        {/* Safety Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
          <h3 className="text-2xl font-dm-sans font-bold text-gray-900 mb-4">
            {supportData.safetyNotice.title}
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {supportData.safetyNotice.content}
          </p>
        </div>
      </main>
      <SimpleFooter/>
    </div>
  );
};

export default EchooSupport;