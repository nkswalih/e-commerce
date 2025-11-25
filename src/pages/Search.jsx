import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchParams({ q: query });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="border-b border-gray-100 bg-white top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-dm-sans font-bold text-gray-900">Search Products</h1>
              <p className="text-gray-600 mt-2">Find exactly what you're looking for</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="size-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-dm-sans font-semibold text-gray-900">
              {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <div className="aspect-square bg-white flex items-center justify-center p-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Stock Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 10 
                        ? 'bg-green-700 text-white' 
                        : product.stock > 0 
                          ? 'bg-orange-700 text-white' 
                          : 'bg-red-700 text-white'
                    }`}>
                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <span className="text-xs text-gray-500 font-light uppercase tracking-wide">
                    {product.brand}
                  </span>
                  
                  <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors min-h-[3rem]">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400 text-sm">
                      {"★".repeat(Math.floor(product.rating))}
                      <span className="text-gray-300">{"★".repeat(5 - Math.floor(product.rating))}</span>
                    </div>
                    <span className="text-xs text-gray-500">{product.rating}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-dm-sans font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                    {product.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <MagnifyingGlassIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-dm-sans font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? `We couldn't find any products matching "${searchQuery}"`
                  : 'No products available in this category'
                }
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={clearSearch}
                  className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  Clear Search
                </button>
                <Link
                  to="/store"
                  className="border border-gray-300 text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Browse All
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer/>
    </div>
  );
};

export default SearchPage;