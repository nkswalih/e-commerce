import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductImages from '../../components/ProductPage/ProductImages';
import ProductInfo from '../../components/ProductPage/ProductInfo';
import ProductActions from '../../components/ProductPage/ProductActions';
import SimpleFooter from '../../components/SimpleFoot';

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({
    storage: '',
    ram: ''
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      const foundProduct = response.data.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Set default selections
        const defaults = {
          storage: foundProduct.variants?.storage?.[0] || '',
          ram: foundProduct.variants?.ram?.[0] || ''
        };
        setSelectedOptions(defaults);
      } else {
        navigate('/404');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const updateSelectedOption = (type, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const updateQuantity = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Product not found</div>
      </div>
    );
  }

  // Add to wishlist function
const addToWishlist = (product) => {
  const wishlistItem = {
    id: product.id,
    addedAt: new Date().toISOString()
  };

  const currentWishlist = JSON.parse(localStorage.getItem('echoo-wishlist') || '[]');
  const exists = currentWishlist.find(item => item.id === product.id);
  
  if (!exists) {
    const updatedWishlist = [...currentWishlist, wishlistItem];
    localStorage.setItem('echoo-wishlist', JSON.stringify(updatedWishlist));
    toast.success('Added to wishlist!');
  } else {
    toast.info('Already in wishlist');
  }
};

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          <ProductImages
            product={product} 
            selectedColor={selectedOptions.color}
          />
          <ProductInfo
            product={product}
            selectedOptions={selectedOptions}
            quantity={quantity}
            onOptionChange={updateSelectedOption}
            onQuantityChange={updateQuantity}
          />
        </div>
      </div>
      <SimpleFooter/>
    </div>
  );
};

export default ProductPage;