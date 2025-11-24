import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex gap-6">
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-500 font-light uppercase tracking-wide">
                      {product.brand}
                    </span>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-400 text-sm">
                        {"★".repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-xs text-gray-500">{product.rating}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className={`text-xs ${
                        product.stock > 10 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-dm-sans font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {product.shortDescription}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Storage: {product.variants?.storage?.[0] || 'Various'}
                  </div>
                  
                  <button className="bg-gray-900 text-white px-6 py-2 rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm">
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;