import axios from 'axios';

const API_BASE = 'http://localhost:3000';

// Helper function to handle API calls
const apiRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${API_BASE}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`API Error (${method} ${endpoint}):`, error);
    throw error;
  }
};

export const addToCart = async (product, color, storage, ram, quantity) => {
  try {
    // First, get the current cart
    let currentCart;
    try {
      currentCart = await apiRequest('GET', '/cart') || [];
    } catch (error) {
      // If cart doesn't exist, create it
      if (error.response?.status === 404) {
        await apiRequest('PUT', '/cart', []);
        currentCart = [];
      } else {
        throw error;
      }
    }

    const cartItem = {
      id: `${product.id}-${color}-${storage}-${ram}`, // Unique ID for cart item
      productId: product.id,
      color: color || '',
      storage: storage || '',
      ram: ram || '',
      quantity: quantity,
      addedAt: new Date().toISOString(),
      productName: product.name,
      productPrice: product.price,
      productImage: product.images?.[0] || '',
      productBrand: product.brand
    };

    // Check if item already exists
    const existingItemIndex = currentCart.findIndex(
      item => item.id === cartItem.id
    );

    let updatedCart;
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      updatedCart = currentCart.map((item, index) =>
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item
      updatedCart = [...currentCart, cartItem];
    }

    // Save to JSON server
    await apiRequest('PUT', '/cart', updatedCart);
    return { success: true };
  } catch (error) {
    console.error('Error in addToCart:', error);
    
    // Fallback to localStorage if JSON server fails
    try {
      const localCart = JSON.parse(localStorage.getItem('echoo-cart') || '[]');
      const cartItem = {
        id: `${product.id}-${color}-${storage}-${ram}`,
        productId: product.id,
        color: color || '',
        storage: storage || '',
        ram: ram || '',
        quantity: quantity,
        addedAt: new Date().toISOString(),
        productName: product.name,
        productPrice: product.price,
        productImage: product.images?.[0] || '',
        productBrand: product.brand
      };

      const existingItemIndex = localCart.findIndex(item => item.id === cartItem.id);
      
      if (existingItemIndex > -1) {
        localCart[existingItemIndex].quantity += quantity;
      } else {
        localCart.push(cartItem);
      }

      localStorage.setItem('echoo-cart', JSON.stringify(localCart));
      return { success: true, fallback: true };
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      throw new Error('Failed to add item to cart');
    }
  }
};

// Get cart items
export const getCart = async () => {
  try {
    const cart = await apiRequest('GET', '/cart');
    return cart || [];
  } catch (error) {
    // Fallback to localStorage
    if (error.response?.status === 404) {
      const localCart = JSON.parse(localStorage.getItem('echoo-cart') || '[]');
      return localCart;
    }
    console.error('Error getting cart:', error);
    return [];
  }
};

// Update cart item quantity
export const updateCartQuantity = async (itemId, newQuantity) => {
  try {
    const cart = await getCart();
    const updatedCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    try {
      await apiRequest('PUT', '/cart', updatedCart);
    } catch (error) {
      // Fallback to localStorage
      localStorage.setItem('echoo-cart', JSON.stringify(updatedCart));
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw new Error('Failed to update cart');
  }
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
  try {
    const cart = await getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    
    try {
      await apiRequest('PUT', '/cart', updatedCart);
    } catch (error) {
      // Fallback to localStorage
      localStorage.setItem('echoo-cart', JSON.stringify(updatedCart));
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw new Error('Failed to remove item from cart');
  }
};