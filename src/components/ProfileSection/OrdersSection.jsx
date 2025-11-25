import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const OrdersSection = ({ orders }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-dm-sans font-semibold text-gray-900 mb-6">
        Order History
      </h3>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
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
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-600">
                      {item.productName} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹
                      {(
                        item.productPrice * item.quantity
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">
                    Payment: {order.paymentMethod}
                  </p>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  ₹{order.total.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBagIcon className="size-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No orders yet</p>
          <Link
            to="/store"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Start shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;