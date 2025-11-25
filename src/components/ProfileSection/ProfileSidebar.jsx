import React from "react";
import {
  UserCircleIcon,
  HeartIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const ProfileSidebar = ({ 
  user, 
  activeSection, 
  setActiveSection, 
  cartItems, 
  wishlistItems, 
  orders 
}) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: UserCircleIcon },
    { id: "orders", label: "My Orders", icon: ShoppingBagIcon },
    { id: "wishlist", label: "Wishlist", icon: HeartIcon },
    { id: "cart", label: "My Cart", icon: ShoppingBagIcon },
  ];

  return (
    <div className="lg:w-80">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gray-100 rounded-full p-3">
            <UserCircleIcon className="size-12 text-gray-400" />
          </div>
          <div>
            <h2 className="font-dm-sans font-semibold text-gray-900">
              {user?.name || "User"}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                activeSection === item.id
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="size-5" />
                <span className="font-normal">{item.label}</span>
              </div>
              <ChevronRightIcon
                className={`size-4 ${
                  activeSection === item.id ? "text-white" : "text-gray-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-dm-sans font-semibold text-gray-900 mb-4">
          Quick Stats
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Cart Items</span>
            <span className="font-semibold text-gray-900">
              {cartItems.length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Wishlist</span>
            <span className="font-semibold text-gray-900">
              {wishlistItems.length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Orders</span>
            <span className="font-semibold text-gray-900">
              {orders.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;