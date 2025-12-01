import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const OrdersSection = ({ user }) => {
  const orders = user?.order || [];
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-dm-sans font-semibold text-gray-900 mb-6">
          Order History
        </h3>
        <div className="text-center py-12">
          <ShoppingBagIcon className="size-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No orders yet</p>
          <p className="text-sm text-gray-400 mb-4">
            Your orders will appear here once you make a purchase.
          </p>
          <Link
            to="/store"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-dm-sans font-semibold text-gray-900 mb-6">
        Order History ({orders.length})
      </h3>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 border border-gray-200 rounded-xl hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-gray-900">
                  Order #{order.id?.substring(0, 8) || order.id}
                </p>
                <p className="text-sm text-gray-500">
                  {order.date ? new Date(order.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }) : 'Date not available'}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === "confirmed" 
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "shipped"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-600">
                    {item.productName || item.name} × {item.quantity || 1}
                  </span>
                  <span className="font-medium">
                    ₹{((item.productPrice || item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">
                  Payment: <span className="font-medium capitalize">{order.paymentMethod || 'Not specified'}</span>
                </p>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                ₹{(order.total || 0).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSection;