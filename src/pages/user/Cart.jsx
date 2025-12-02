import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3000';

  useEffect(() => {
    fetchUserAndCart();
  }, []);

  // Get current user and cart from JSON server
  const fetchUserAndCart = async () => {
    try {
      setLoading(true);
      
      // Get current user from localStorage
      const currentUserString = localStorage.getItem('currentUser');
      
      if (!currentUserString) {
        console.log("No user found in localStorage");
        setLoading(false);
        return;
      }
      
      const userFromStorage = JSON.parse(currentUserString);
      const userId = userFromStorage.id;
      
      // Get fresh user data from server
      const response = await axios.get(`${API_URL}/users/${userId}`);
      const freshUserData = response.data;
      
      // Update localStorage with fresh data
      localStorage.setItem('currentUser', JSON.stringify(freshUserData));
      
      setCurrentUser(freshUserData);
      setCartItems(freshUserData.cart || []);
      
    } catch (error) {
      console.error("Error fetching user cart:", error);
      
      // If server fails, use localStorage data
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const userFromStorage = JSON.parse(currentUserString);
        setCurrentUser(userFromStorage);
        setCartItems(userFromStorage.cart || []);
      }
    } finally {
      setLoading(false);
    }
  };

  // Update cart in JSON server
  const updateServerCart = async (newCart) => {
    if (!currentUser) return;
    
    try {
      // Optimistic UI update
      setCartItems(newCart);
      
      // Update the user's cart in JSON server
      await axios.patch(`${API_URL}/users/${currentUser.id}`, {
        cart: newCart
      });
      
      // Update local user data
      const updatedUser = { ...currentUser, cart: newCart };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error("Failed to update cart on server:", error);
      // Revert optimistic update on error
      fetchUserAndCart();
    }
  };

  const handleQuantityChange = (itemId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + change;
        if (newQty >= 1) {
          return { ...item, quantity: newQty };
        }
      }
      return item;
    });
    
    const finalCart = updatedCart.filter(item => item.quantity >= 1);
    updateServerCart(finalCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    updateServerCart(updatedCart);
  };

  const handleClearCart = () => {
    updateServerCart([]);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 99;
  const total = subtotal + shipping;

  const formatPrice = (price) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(price);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-md mx-auto">
        <ShoppingBagIcon className="h-20 w-20 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold mb-3 text-center">Please Log In</h2>
        <p className="text-gray-600 text-center mb-6">
          You need to be logged in to view your cart.
        </p>
        <Link to="/sign_in" className="bg-black text-white px-6 py-3 rounded-xl font-medium">
          Go to Login
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ShoppingBagIcon className="h-24 w-24 text-gray-200 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-3">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-2">Hello, {currentUser.name}!</p>
        <p className="text-gray-500 mb-8">Your cart is currently empty.</p>
        <Link 
          to="/store" 
          className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <button 
            onClick={handleClearCart}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border border-gray-100 rounded-2xl p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 flex-shrink-0">
                <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.productName}</h3>
                    <p className="text-sm text-gray-500">{item.storage} | {item.ram}</p>
                    <p className="font-bold mt-1">{formatPrice(item.productPrice)}</p>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="text-gray-400 hover:text-red-500">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button onClick={() => handleQuantityChange(item.id, -1)} className="w-8 h-8 border rounded-lg flex items-center justify-center">-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} className="w-8 h-8 border rounded-lg flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-2xl sticky top-4">
            <h3 className="font-bold text-lg mb-4">Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="border-t pt-3 flex justify-between font-bold text-base"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <button onClick={() => navigate('/checkout')} className="w-full bg-black text-white py-4 rounded-xl mt-6 font-medium">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;