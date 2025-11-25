import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  HeartIcon,
  EnvelopeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const OverviewSection = ({ user, cartItems, wishlistItems, setActiveSection }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-dm-sans font-bold mb-2">
          Welcome back, {user?.name?.split(" ")[0] || "User"}!
        </h2>
        <p className="text-gray-300 mb-6">
          Ready to discover your next favorite tech gadget?
        </p>
        <Link
          to="/store"
          className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
        >
          <ShoppingBagIcon className="size-5" />
          Continue Shopping
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBagIcon className="size-6 text-gray-600" />
            <h3 className="font-dm-sans font-semibold text-gray-900">
              My Cart
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
          <Link
            to="/cart"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View Cart →
          </Link>
        </div>

        {/* Wishlist Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <HeartIcon className="size-6 text-gray-600" />
            <h3 className="font-dm-sans font-semibold text-gray-900">
              Wishlist
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'saved item' : 'saved items'}
          </p>
          <button
            onClick={() => setActiveSection("wishlist")}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View Wishlist →
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-dm-sans font-semibold text-gray-900 mb-6">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl">
            <div className="bg-gray-100 p-2 rounded-lg">
              <EnvelopeIcon className="size-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl">
            <div className="bg-gray-100 p-2 rounded-lg">
              <CalendarIcon className="size-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Member since</p>
              <p className="font-medium text-gray-900">
                January 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;