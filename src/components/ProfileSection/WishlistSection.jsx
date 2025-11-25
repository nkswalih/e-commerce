import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";

const WishlistSection = ({ wishlistItems, products, getProductById, removeFromWishlist }) => {
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
        My Wishlist
      </h3>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistItems.map((item) => {
            const product = getProductById(item.id);
            if (!product) return null;

            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      to={`/product/${product.id}`}
                      className="font-medium text-gray-900 hover:text-gray-700 transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.brand}
                    </p>
                    <p className="text-lg font-dm-sans font-bold text-gray-900 mt-2">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <HeartIcon className="size-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">Your wishlist is empty</p>
          <Link
            to="/store"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Explore products
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;