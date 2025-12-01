import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  HeartIcon,
  EnvelopeIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Package2Icon } from "lucide-react";

const OverviewSection = ({ user, setActiveSection }) => {
  const cartItems = user?.cart || [];
  const wishlistItems = user?.wishlist || [];
  const orders = user?.order || [];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-dm-sans font-bold mb-2">
              Welcome back, {user?.name?.split(" ")[0] || "User"}!
            </h2>
            <p className="text-gray-300 mb-6">
              {cartItems.length > 0 
                ? `You have ${cartItems.length} item${cartItems.length === 1 ? '' : 's'} in your cart`
                : 'Ready to discover your next favorite tech gadget?'}
            </p>
          </div>
          <div className="text-right">
            <Link
              to="/store"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              <ShoppingBagIcon className="size-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Summary */}
        <button
          onClick={() => setActiveSection("cart")}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <ShoppingBagIcon className="size-6 text-blue-600" />
            </div>
            <h3 className="font-dm-sans font-semibold text-gray-900">
              Shopping Cart
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {cartItems.length}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            {cartItems.length === 1 ? 'Item' : 'Items'} in cart
          </p>
          <div className="mt-4 text-blue-600 font-medium text-sm">
            View Cart →
          </div>
        </button>

        {/* Orders Summary */}
        <button
          onClick={() => setActiveSection("orders")}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package2Icon className="size-6 text-green-600"/>
            </div>
            <h3 className="font-dm-sans font-semibold text-gray-900">
              My Orders
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {orders.length}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            {orders.length === 1 ? 'Order' : 'Orders'} placed
          </p>
          <div className="mt-4 text-blue-600 font-medium text-sm">
            View Orders →
          </div>
        </button>

        {/* Wishlist Summary */}
        <button
          onClick={() => setActiveSection("wishlist")}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-lg">
              <HeartIcon className="size-6 text-red-600" />
            </div>
            <h3 className="font-dm-sans font-semibold text-gray-900">
              Wishlist
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {wishlistItems.length}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            {wishlistItems.length === 1 ? 'Saved item' : 'Saved items'}
          </p>
          <div className="mt-4 text-blue-600 font-medium text-sm">
            View Wishlist →
          </div>
        </button>
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
              <UserIcon className="size-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-900">
                {user?.name || "User"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;