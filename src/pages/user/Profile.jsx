import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import ProfileSidebar from "../../components/ProfileSection/ProfileSidebar";
import OverviewSection from "../../components/ProfileSection/OverviewSection";
import OrdersSection from "../../components/ProfileSection/OrdersSection";
import WishlistSection from "../../components/ProfileSection/WishlistSection";
import CartSection from "../../components/ProfileSection/CartSection";

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsResponse] = await Promise.all([
        axios.get("http://localhost:3000/products"),
      ]);

      setProducts(productsResponse.data);

      // Get cart from localStorage
      const savedCart = JSON.parse(localStorage.getItem("echoo-cart") || "[]");
      setCartItems(savedCart);

      // Get wishlist from localStorage
      const savedWishlist = JSON.parse(
        localStorage.getItem("echoo-wishlist") || "[]"
      );
      setWishlistItems(savedWishlist);

      // Get orders from localStorage
      const savedOrders = JSON.parse(
        localStorage.getItem("echoo-orders") || "[]"
      );
      setOrders(savedOrders);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== productId
    );
    setWishlistItems(updatedWishlist);
    localStorage.setItem("echoo-wishlist", JSON.stringify(updatedWishlist));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("echoo-cart", JSON.stringify(updatedCart));
  };

  const getProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const renderActiveSection = () => {
    const sectionProps = {
      user,
      cartItems,
      wishlistItems,
      orders,
      products,
      getProductById,
      removeFromWishlist,
      removeFromCart,
      setActiveSection
    };

    switch (activeSection) {
      case "overview":
        return <OverviewSection {...sectionProps} />;
      case "orders":
        return <OrdersSection {...sectionProps} />;
      case "wishlist":
        return <WishlistSection {...sectionProps} />;
      case "cart":
        return <CartSection {...sectionProps} />;
      default:
        return <OverviewSection {...sectionProps} />;
    }
  };

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
                Manage your profile and preferences
              </p>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar
            user={user}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            orders={orders}
          />

          {/* Main Content */}
          <div className="flex-1">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;