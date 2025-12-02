import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowPathIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import ProfileSidebar from "../../components/ProfileSection/ProfileSidebar";
import OverviewSection from "../../components/ProfileSection/OverviewSection";
import OrdersSection from "../../components/ProfileSection/OrdersSection";
import WishlistSection from "../../components/ProfileSection/WishlistSection";
import CartSection from "../../components/ProfileSection/CartSection";

const Profile = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3000";
  
  // Get current user from localStorage
  const getCurrentUserFromStorage = () => {
    try {
      const userString = localStorage.getItem('currentUser');
      return userString ? JSON.parse(userString) : null;
    } catch {
      return null;
    }
  };

  const [currentUser, setCurrentUser] = useState(getCurrentUserFromStorage());
  const [activeSection, setActiveSection] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set active section based on URL
    const path = window.location.pathname;
    if (path.includes('/profile/orders')) {
      setActiveSection('orders');
    } else if (path.includes('/profile/wishlist')) {
      setActiveSection('wishlist');
    } else if (path.includes('/profile/cart')) {
      setActiveSection('cart');
    } else {
      setActiveSection('overview');
    }

    if (currentUser && currentUser.id) {
      fetchUserData(currentUser.id);
    } else {
      setLoading(false);
      // Redirect to login if no user
      navigate('/sign_in');
    }
  }, []);

  // Update URL when section changes
  useEffect(() => {
    const sectionPaths = {
      overview: '/profile',
      orders: '/profile/orders',
      wishlist: '/profile/wishlist',
      cart: '/profile/cart'
    };
    navigate(sectionPaths[activeSection] || '/profile');
  }, [activeSection, navigate]);

  const fetchUserData = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users/${userId}`);
      const userData = response.data;
      
      // Update localStorage with fresh data
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate("/");
  };

  const refreshData = () => {
    if (currentUser && currentUser.id) {
      fetchUserData(currentUser.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your profile.
          </p>
          <button
            onClick={() => navigate("/sign_in")}
            className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-dm-sans font-bold text-gray-900">
                My Account
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome back, {currentUser.name}!
              </p>
              <div className="flex items-center gap-3 mt-2">
              </div>
            </div>
            <div className="flex items-center">
              <ArrowPathIcon onClick={refreshData}
               className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 w-auto h-9 hover:bg-gray-100 rounded-lg"/>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ArrowRightOnRectangleIcon className="size-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar
            user={currentUser}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === "overview" && (
              <OverviewSection 
                user={currentUser} 
                setActiveSection={setActiveSection}
              />
            )}
            {activeSection === "orders" && (
              <OrdersSection user={currentUser} />
            )}
            {activeSection === "wishlist" && (
              <WishlistSection user={currentUser} />
            )}
            {activeSection === "cart" && (
              <CartSection user={currentUser} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;