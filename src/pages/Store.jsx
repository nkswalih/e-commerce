import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreHeader from '../components/StorePage/StoreHeader';
import CategoryFilter from '../components/StorePage/CategoryFilter';
import ProductGrid from '../components/StorePage/ProductGrid';
// import ProductList from '../components/StorePage/ProductList';
import Footer from '../components/Footer';


const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // Get unique categories from products
  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    ...Array.from(new Set(products.map(p => p.category))).map(category => ({
      id: category.toLowerCase(),
      name: category,
      count: products.filter(p => p.category === category).length
    }))
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      activeCategory === 'all' || product.category.toLowerCase() === activeCategory
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <StoreHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        productCount={filteredProducts.length}
        activeCategory={activeCategory}
        categories={categories}
      />
      
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ProductGrid products={filteredProducts} />
      {/* {viewMode === 'grid' ? (
      ) : (
        <ProductList products={filteredProducts} />
      )} */}
      <Footer/>
    </div>
  );
};

export default StorePage;