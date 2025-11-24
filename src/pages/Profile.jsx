import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  UserCircleIcon,
  HeartIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsResponse] = await Promise.all([
        axios.get('http://localhost:3000/products'),
      ]);
      
      setProducts(productsResponse.data);
      
      // Get cart from localStorage
      const savedCart = JSON.parse(localStorage.getItem('echoo-cart') || '[]');
      setCartItems(savedCart);
      
      // Get wishlist from localStorage
      const savedWishlist = JSON.parse(localStorage.getItem('echoo-wishlist') || '[]');
      setWishlistItems(savedWishlist);
      
      // Get orders from localStorage (you can replace with actual API)
      const savedOrders = JSON.parse(localStorage.getItem('echoo-orders') || '[]');
      setOrders(savedOrders);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('echoo-wishlist', JSON.stringify(updatedWishlist));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('echoo-cart', JSON.stringify(updatedCart));
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: UserCircleIcon },
    { id: 'orders', label: 'My Orders', icon: ShoppingBagIcon },
    { id: 'wishlist', label: 'Wishlist', icon: HeartIcon },
    { id: 'cart', label: 'My Cart', icon: ShoppingBagIcon },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-dm-sans font-bold text-gray-900">My Account</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your profile and preferences</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="size-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gray-100 rounded-full p-3">
                  <UserCircleIcon className="size-12 text-gray-400" />
                </div>
                <div>
                  <h2 className="font-dm-sans font-semibold text-gray-900">{user?.name || 'User'}</h2>
                  <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="size-5" />
                      <span className="font-normal">{item.label}</span>
                    </div>
                    <ChevronRightIcon className={`size-4 ${
                      activeSection === item.id ? 'text-white' : 'text-gray-400'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-dm-sans font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cart Items</span>
                  <span className="font-semibold text-gray-900">{cartItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Wishlist</span>
                  <span className="font-semibold text-gray-900">{wishlistItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Orders</span>
                  <span className="font-semibold text-gray-900">{orders.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white">
                  <h2 className="text-2xl font-dm-sans font-bold mb-2">
                    Welcome back, {user?.name?.split(' ')[0] || 'User'}!
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Ready to discover your next favorite tech gadget?
                  </p>
                  <Link
                    to="/store"
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingBagIcon className="size-5" />
                    Continue Shopping
                  </Link>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cart Summary */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <ShoppingBagIcon className="size-6 text-gray-600" />
                      <h3 className="font-dm-sans font-semibold text-gray-900">My Cart</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {cartItems.length} items in your cart
                    </p>
                    <Link
                      to="/cart"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Cart →
                    </Link>
                  </div>

                  {/* Wishlist Summary */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <HeartIcon className="size-6 text-gray-600" />
                      <h3 className="font-dm-sans font-semibold text-gray-900">Wishlist</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {wishlistItems.length} saved items
                    </p>
                    <button
                      onClick={() => setActiveSection('wishlist')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Wishlist →
                    </button>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-dm-sans font-semibold text-gray-900 mb-6">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <EnvelopeIcon className="size-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{user?.email || 'user@example.com'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <CalendarIcon className="size-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Member since</p>
                        <p className="font-medium text-gray-900">January 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Section */}
            {activeSection === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-dm-sans font-semibold text-gray-900 mb-6">Order History</h3>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">#{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatPrice(order.total)}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBagIcon className="size-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No orders yet</p>
                    <Link
                      to="/store"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Start shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Section */}
            {activeSection === 'wishlist' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-dm-sans font-semibold text-gray-900 mb-6">My Wishlist</h3>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlistItems.map((item) => {
                      const product = getProductById(item.id);
                      if (!product) return null;

                      return (
                        <div key={item.id} className="border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition-all">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <Link
                                to={`/product/${product.id}`}
                                className="font-medium text-gray-900 hover:text-gray-700 transition-colors line-clamp-1"
                              >
                                {product.name}
                              </Link>
                              <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                              <p className="text-lg font-dm-sans font-bold text-gray-900 mt-2">
                                {formatPrice(product.price)}
                              </p>
                              <div className="flex gap-2 mt-3">
                                <button className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                                  Add to Cart
                                </button>
                                <button
                                  onClick={() => removeFromWishlist(item.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <TrashIcon className="size-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartIcon className="size-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Your wishlist is empty</p>
                    <Link
                      to="/store"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Explore products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Cart Section */}
            {activeSection === 'cart' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-dm-sans font-semibold text-gray-900 mb-6">My Cart</h3>
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const product = getProductById(item.productId);
                      if (!product) return null;

                      return (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                          <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                            <img
                              src={item.productImage || product.images[0]}
                              alt={item.productName}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <Link
                              to={`/product/${item.productId}`}
                              className="font-medium text-gray-900 hover:text-gray-700 transition-colors"
                            >
                              {item.productName}
                            </Link>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                              {item.color && <span>Color: {item.color}</span>}
                              {item.storage && <span>Storage: {item.storage}</span>}
                            </div>
                            <p className="text-lg font-dm-sans font-bold text-gray-900 mt-2">
                              {formatPrice(item.productPrice)} × {item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <TrashIcon className="size-4" />
                          </button>
                        </div>
                      );
                    })}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="font-semibold text-gray-900">Total: {formatPrice(
                        cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0)
                      )}</span>
                      <Link
                        to="/cart"
                        className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      >
                        Go to Cart
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBagIcon className="size-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Your cart is empty</p>
                    <Link
                      to="/store"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Continue shopping
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;