import React, { useState } from 'react';
import { ShoppingBagIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const ProductActions = ({ product, selectedOptions, quantity, onQuantityChange }) => {
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToBag = async () => {
    if (addingToCart || product.stock === 0) return;
    
    setAddingToCart(true);
    
    // Simple localStorage approach that always works
    try {
      const cartItem = {
        id: `${product.id}-${selectedOptions.color}-${selectedOptions.storage}-${selectedOptions.ram}`,
        productId: product.id,
        color: selectedOptions.color,
        storage: selectedOptions.storage,
        ram: selectedOptions.ram,
        quantity: quantity,
        addedAt: new Date().toISOString(),
        productName: product.name,
        productPrice: product.price,
        productImage: product.images?.[0] || '',
        productBrand: product.brand
      };

      // Get current cart from localStorage
      const currentCart = JSON.parse(localStorage.getItem('echoo-cart') || '[]');
      
      // Check if item exists
      const existingIndex = currentCart.findIndex(item => item.id === cartItem.id);
      
      let updatedCart;
      if (existingIndex > -1) {
        updatedCart = currentCart.map((item, index) =>
          index === existingIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...currentCart, cartItem];
      }

      // Save to localStorage
      localStorage.setItem('echoo-cart', JSON.stringify(updatedCart));
      
      toast.success(`${quantity} ${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "rounded-xl",
        });
      
    } catch (error) {
      console.error('Cart error:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-medium text-gray-900">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            disabled={quantity >= product.stock}
            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleAddToBag}
          disabled={addingToCart || product.stock === 0}
          className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingBagIcon className="size-5" />
          {addingToCart ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
        </button>
        <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <HeartIcon className="size-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProductActions;