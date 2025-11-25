import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const cartItems = JSON.parse(localStorage.getItem('echoo-cart') || '[]');
  const products = []; // You'll need to fetch products or pass them as props

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.productPrice || 0) * item.quantity;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 50000 ? 0 : 99;
    return subtotal + shipping;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      // Create order object
      const order = {
        id: 'ORD' + Date.now(),
        date: new Date().toISOString(),
        items: cartItems,
        total: calculateTotal(),
        subtotal: calculateSubtotal(),
        shipping: calculateSubtotal() > 50000 ? 0 : 99,
        status: 'confirmed',
        customerInfo: formData,
        paymentMethod: formData.paymentMethod
      };

      // Save order to localStorage (replace with API call in real app)
      const existingOrders = JSON.parse(localStorage.getItem('echoo-orders') || '[]');
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem('echoo-orders', JSON.stringify(updatedOrders));

      // Clear cart
      localStorage.setItem('echoo-cart', JSON.stringify([]));

      // Navigate to order confirmation
      navigate(`/order-confirmation/${order.id}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/store')}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img 
                          src={item.productImage} 
                          alt={item.productName}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.productName}</p>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      ₹{(item.productPrice * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{calculateSubtotal() > 50000 ? 'Free' : '₹99'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="text-gray-600 focus:ring-gray-500"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="text-gray-600 focus:ring-gray-500"
                  />
                  <span>UPI</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="text-gray-600 focus:ring-gray-500"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;