import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import Footer from '../components/Footer';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      // Fetch products and get cart from localStorage
      const productsResponse = await axios.get('http://localhost:3000/products');
      setProducts(productsResponse.data);
      
      // Get cart from localStorage
      const savedCart = JSON.parse(localStorage.getItem('echoo-cart') || '[]');
      setCartItems(savedCart);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const updateCartInStorage = (updatedCart) => {
    localStorage.setItem('echoo-cart', JSON.stringify(updatedCart));
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    updateCartInStorage(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    updateCartInStorage(updatedCart);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product?.price || item.productPrice || 0) * item.quantity;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 50000 ? 0 : 99; // Free shipping over ₹50,000
    return subtotal + shipping;
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('echoo-cart', JSON.stringify([]));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBagIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-dm-sans font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/store"
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-dm-sans font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="space-y-6">
              {cartItems.map((item) => {
                const product = getProductById(item.productId);

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-all"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                        <img
                          src={item.productImage || product?.images?.[0]}
                          alt={item.productName}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link
                              to={`/product/${item.productId}`}
                              className="font-medium text-gray-900 hover:text-gray-700 transition-colors"
                            >
                              {item.productName}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{item.productBrand}</p>
                            
                            {/* Variants */}
                            <div className="flex gap-4 mt-2 text-sm text-gray-600">
                              {item.color && item.color !== '' && (
                                <span>Color: {item.color}</span>
                              )}
                              {item.storage && item.storage !== '' && (
                                <span>Storage: {item.storage}</span>
                              )}
                              {item.ram && item.ram !== '' && (
                                <span>RAM: {item.ram}</span>
                              )}
                            </div>
                            
                            <p className="text-lg font-dm-sans font-bold text-gray-900 mt-2">
                              {formatPrice(item.productPrice)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <TrashIcon className="size-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <MinusIcon className="size-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <PlusIcon className="size-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-dm-sans font-bold text-gray-900">
                              {formatPrice(item.productPrice * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
              <h3 className="text-lg font-dm-sans font-bold text-gray-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(calculateSubtotal())}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {calculateSubtotal() > 50000 ? 'Free' : formatPrice(99)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-dm-sans font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {calculateSubtotal() > 50000 
                      ? 'You qualify for free shipping!' 
                      : 'Add ₹' + (50000 - calculateSubtotal()).toLocaleString('en-IN') + ' more for free shipping'
                    }
                  </p>
                </div>

                <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors mt-6">
                  Proceed to Checkout
                </button>

                <Link
                  to="/store"
                  className="w-full border border-gray-300 text-gray-900 py-4 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;