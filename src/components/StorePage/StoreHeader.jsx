import React from 'react';
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

const StoreHeader = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  productCount,
  activeCategory,
  categories
}) => {
  const activeCategoryName = categories.find(c => c.id === activeCategory)?.name;

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"> {/* Reduced py-8 to py-6 */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-5xl font-dm-sans font-bold text-gray-900">Store.</h1>
            <p className="text-gray-600 mt-2 font-dm-sans">
              {activeCategory === 'all' 
                ? `Discover ${productCount} products` 
                : `${activeCategoryName} • ${productCount} products`
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder:font-dm-sans placeholder:text-sm"
              />
            </div>
            
            <div className="flex gap-3">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 font-dm-sans rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              
              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Squares2X2Icon className="size-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ListBulletIcon className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;