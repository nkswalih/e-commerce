import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import OfferBanner from '../../components/Header/offer1';

const AccessoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Current index for each category
  const [appleIndex, setAppleIndex] = useState(0);
  const [casesIndex, setCasesIndex] = useState(0);
  const [audioIndex, setAudioIndex] = useState(0);
  const [otherIndex, setOtherIndex] = useState(0);

  // Items per view based on screen size
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        const productsData = Array.isArray(response.data) 
          ? response.data 
          : response.data.products || [];
        
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter accessories by category and type
  const appleAccessories = products?.filter(product => 
    product?.brand === 'Apple' && product?.category === 'Accessory'
  ) || [];

  const casesAccessories = products?.filter(product => 
    product?.category === 'Accessory' && 
    product?.name.toLowerCase().includes('case')
  ) || [];

  const audioAccessories = products?.filter(product => 
    product?.category === 'Accessory' && 
    (product?.name.toLowerCase().includes('earbud') || 
     product?.name.toLowerCase().includes('airpod') ||
     product?.name.toLowerCase().includes('headphone') ||
     product?.name.toLowerCase().includes('audio'))
  ) || [];

  const otherAccessories = products?.filter(product => 
    product?.category === 'Accessory' && 
    !product?.name.toLowerCase().includes('case') &&
    !product?.name.toLowerCase().includes('earbud') &&
    !product?.name.toLowerCase().includes('airpod') &&
    !product?.name.toLowerCase().includes('headphone') &&
    !product?.name.toLowerCase().includes('audio') &&
    product?.brand !== 'Apple'
  ) || [];

  // Navigation handlers
  const nextSlide = (products, currentIndex, setIndex) => {
    if (currentIndex < Math.ceil(products.length / itemsPerView) - 1) {
      setIndex(currentIndex + 1);
    }
  };

  const prevSlide = (currentIndex, setIndex) => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading accessories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  const ProductCard = ({ product }) => (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full cursor-pointer"
      onClick={() => handleProductClick(product.id)}
    >
      <div className="p-6 flex-1">
        <div className="h-48 flex items-center justify-center mb-4">
          <img 
            src={product.images?.[0] || '/placeholder-image.jpg'} 
            alt={product.name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-gray-900">
            ₹{(product.price || 0).toLocaleString()}
          </span>
        </div>
        {product.stock === 0 && (
          <div className="mt-2 text-sm text-red-600 font-medium">Out of Stock</div>
        )}
      </div>
    </div>
  );

  const ProductGridSection = ({ 
    title, 
    products, 
    currentIndex, 
    onNext, 
    onPrev 
  }) => {
    if (products.length === 0) return null;

    const totalSlides = Math.ceil(products.length / itemsPerView);
    const startIndex = currentIndex * itemsPerView;
    const visibleProducts = products.slice(startIndex, startIndex + itemsPerView);

    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {totalSlides}
            </span>
            <div className="flex space-x-3">
              <button
                onClick={onPrev}
                disabled={currentIndex === 0}
                className={`p-4 rounded-2xl transition-all duration-200 ${
                  currentIndex === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-800 text-white hover:bg-gray-900 transform hover:scale-105'
                }`}
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={onNext}
                disabled={currentIndex === totalSlides - 1}
                className={`p-4 rounded-2xl transition-all duration-200 ${
                  currentIndex === totalSlides - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-900 transform hover:scale-105'
                }`}
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`grid gap-6 ${
          itemsPerView === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
          itemsPerView === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          itemsPerView === 2 ? 'grid-cols-1 md:grid-cols-2' :
          'grid-cols-1'
        }`}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (title === 'Apple Accessories') setAppleIndex(index);
                  else if (title === 'Phone Cases') setCasesIndex(index);
                  else if (title === 'Audio & Headphones') setAudioIndex(index);
                  else setOtherIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-gray-800 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white">
        <OfferBanner/>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold font-dm-sans text-gray-900 mb-6">
            Premium Accessories
          </h1>
        </div>
        
        <div className="flex justify-start">
        </div>

        <div className="text-3xl inline-flex font-semibold font-dm-sans text-gray-500 max-w-4xl mx-auto">
          <p className='text-3xl inline-flex font-semibold font-dm-sans text-gray-900 max-w-4xl mx-auto'>Essential Companions. </p>&nbsp;Enhance your device experience.
        </div>

        {/* Apple Accessories */}
        <ProductGridSection
          title="Apple Accessories"
          products={appleAccessories}
          currentIndex={appleIndex}
          onNext={() => nextSlide(appleAccessories, appleIndex, setAppleIndex)}
          onPrev={() => prevSlide(appleIndex, setAppleIndex)}
        />

        {/* Phone Cases */}
        <ProductGridSection
          title="Phone Cases"
          products={casesAccessories}
          currentIndex={casesIndex}
          onNext={() => nextSlide(casesAccessories, casesIndex, setCasesIndex)}
          onPrev={() => prevSlide(casesIndex, setCasesIndex)}
        />

        {/* Audio & Headphones */}
        <ProductGridSection
          title="Audio & Headphones"
          products={audioAccessories}
          currentIndex={audioIndex}
          onNext={() => nextSlide(audioAccessories, audioIndex, setAudioIndex)}
          onPrev={() => prevSlide(audioIndex, setAudioIndex)}
        />

        {/* Other Accessories */}
        <ProductGridSection
          title="Other Accessories"
          products={otherAccessories}
          currentIndex={otherIndex}
          onNext={() => nextSlide(otherAccessories, otherIndex, setOtherIndex)}
          onPrev={() => prevSlide(otherIndex, setOtherIndex)}
        />

        {/* Empty State */}
        {appleAccessories.length === 0 && casesAccessories.length === 0 && audioAccessories.length === 0 && otherAccessories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No accessories found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccessoriesPage;