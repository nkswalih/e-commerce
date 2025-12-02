import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useApi from '../../../hooks/useApi'
import { useNavigate } from 'react-router-dom'

const AdminProducts = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [tempSpecKey, setTempSpecKey] = useState('');
  const [tempSpecValue, setTempSpecValue] = useState('');
  const [tempVariantKey, setTempVariantKey] = useState('');
  const [tempVariantValue, setTempVariantValue] = useState('');

  const { 
    data: products = [], 
    loading, 
    error, 
    refetch,
    createData,
    patchData,
    deleteData 
  } = useApi("products");

  // Initialize add form with dynamic structure
  const initialAddForm = {
    name: '',
    category: 'Smartphone',
    brand: '',
    price: 0,
    currency: 'INR',
    stock: 0,
    images: [],
    shortDescription: '',
    features: [],
    specs: {},
    variants: {},
    status: 'new'
  };

  const [addForm, setAddForm] = useState(initialAddForm);
  const [editForm, setEditForm] = useState(initialAddForm);

  // Get current user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Filter products based on search, category, and status
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle product edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      id: product.id,
      name: product.name || '',
      category: product.category || 'Smartphone',
      brand: product.brand || '',
      price: product.price || 0,
      currency: product.currency || 'INR',
      stock: product.stock || 0,
      images: product.images || [],
      shortDescription: product.shortDescription || '',
      features: product.features || [],
      specs: product.specs || {},
      variants: product.variants || {},
      status: product.status || 'new'
    });
    setShowEditModal(true);
    toast.info(`Editing product: ${product.name}`);
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!editingProduct) return;

    try {
      // Format data
      const formattedData = {
        ...editForm,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
        id: editingProduct.id // Keep original ID
      };

      await patchData(editingProduct.id, formattedData);
      
      toast.success('Product updated successfully!');
      setShowEditModal(false);
      setEditingProduct(null);
      setEditForm(initialAddForm);
    } catch (error) {
      toast.error('Failed to update product');
      console.error('Error updating product:', error);
    }
  };

  // Handle delete product
  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      await deleteData(product.id);
      toast.success(`Product "${product.name}" deleted successfully!`);
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', error);
    }
  };

  // Handle add product
  const handleAddProduct = () => {
    setShowAddModal(true);
    setAddForm(initialAddForm);
  };

  // Handle save new product
  const handleSaveNewProduct = async () => {
    try {
      // Generate unique ID
      const productId = `${addForm.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      
      // Format data
      const newProduct = {
        ...addForm,
        id: productId,
        price: Number(addForm.price),
        stock: Number(addForm.stock),
        images: addForm.images.length > 0 ? addForm.images : ['https://via.placeholder.com/300x300?text=No+Image']
      };

      await createData(newProduct);
      
      toast.success('Product added successfully!');
      setShowAddModal(false);
      setAddForm(initialAddForm);
      refetch(); // Refresh product list
    } catch (error) {
      toast.error('Failed to add product');
      console.error('Error adding product:', error);
    }
  };

  // Handle feature addition
  const handleAddFeature = (formType, feature) => {
    const form = formType === 'edit' ? editForm : addForm;
    const setForm = formType === 'edit' ? setEditForm : setAddForm;
    
    if (feature.trim()) {
      setForm({
        ...form,
        features: [...form.features, feature.trim()]
      });
    }
  };

  // Handle feature removal
  const handleRemoveFeature = (formType, index) => {
    const form = formType === 'edit' ? editForm : addForm;
    const setForm = formType === 'edit' ? setEditForm : setAddForm;
    
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== index)
    });
  };

  // Handle image addition
  const handleAddImage = (formType) => {
    const form = formType === 'edit' ? editForm : addForm;
    const setForm = formType === 'edit' ? setEditForm : setAddForm;
    const url = formType === 'edit' ? tempImageUrl : tempImageUrl;
    
    if (url.trim()) {
      setForm({
        ...form,
        images: [...form.images, url.trim()]
      });
      setTempImageUrl('');
    }
  };

  // Handle image removal
  const handleRemoveImage = (formType, index) => {
    const form = formType === 'edit' ? editForm : addForm;
    const setForm = formType === 'edit' ? setEditForm : setAddForm;
    
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index)
    });
  };

  // Handle spec addition
  const handleAddSpec = (formType) => {
    const form = formType === 'edit' ? editForm : addForm;
    const setForm = formType === 'edit' ? setEditForm : setAddForm;
    
    if (tempSpecKey.trim() && tempSpecValue.trim()) {
      setForm({
        ...form,
        specs: {
          ...form.specs,
          [tempSpecKey.trim()]: tempSpecValue.trim()
        }
      });
      setTempSpecKey('');
      setTempSpecValue('');
    }
  };

  // Handle spec removal
  const handleRemoveSpec = (formType, key) => {
    const form = formType === 'edit' ? editForm : addForm;
    const setForm = formType === 'edit' ? setEditForm : setAddForm;
    
    const newSpecs = { ...form.specs };
    delete newSpecs[key];
    
    setForm({
      ...form,
      specs: newSpecs
    });
  };

  // Handle variant addition
  const handleAddVariant = (formType, variantType) => {
    const form = formType === 'edit' ? editForm : addForm;
    const setForm = formType === 'edit' ? setEditForm : setAddForm;
    
    if (tempVariantKey.trim() && tempVariantValue.trim()) {
      const currentVariants = { ...form.variants };
      
      if (!currentVariants[variantType]) {
        currentVariants[variantType] = [];
      }
      
      setForm({
        ...form,
        variants: {
          ...currentVariants,
          [variantType]: [...currentVariants[variantType], tempVariantValue.trim()]
        }
      });
      setTempVariantValue('');
    }
  };

  // Handle variant removal
  const handleRemoveVariant = (formType, variantType, index) => {
    const form = formType === 'edit' ? editForm : addForm;
    const setForm = formType === 'edit' ? setEditForm : setAddForm;
    
    const currentVariants = { ...form.variants };
    if (currentVariants[variantType]) {
      currentVariants[variantType] = currentVariants[variantType].filter((_, i) => i !== index);
      
      setForm({
        ...form,
        variants: currentVariants
      });
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const statuses = ['all', 'new', 'active', 'out-of-stock', 'inactive', 'coming-soon'];

  // Common product categories for dropdown
  const productCategories = [
    'Smartphone', 'Laptop', 'Tablet', 'Accessory', 'Wearables', 
    'Gaming', 'Audio', 'Smart Home', 'Camera', 'Other'
  ];

  // Format price with currency
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'coming-soon': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get stock color
  const getStockColor = (stock) => {
    if (stock === 0) return 'bg-red-100 text-red-800';
    if (stock < 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  // Common form fields component
  const renderFormFields = (formType) => {
    const form = formType === 'edit' ? editForm : addForm;
    const setForm = formType === 'edit' ? setEditForm : setAddForm;
    
    return (
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand *
            </label>
            <input
              type="text"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            >
              {productCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            >
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ({form.currency}) *
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock *
            </label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              min="0"
              required
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <textarea
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            rows="2"
            placeholder="Brief description of the product..."
          />
        </div>

        {/* Images Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {form.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="h-20 w-20 rounded-lg object-cover border"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(formType, index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tempImageUrl}
              onChange={(e) => setTempImageUrl(e.target.value)}
              placeholder="Paste image URL here"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddImage(formType);
                }
              }}
            />
            <button
              type="button"
              onClick={() => handleAddImage(formType)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add Image
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
            {form.features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(formType, index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a feature"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target;
                  handleAddFeature(formType, input.value);
                  input.value = '';
                }
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                const input = e.target.previousElementSibling;
                handleAddFeature(formType, input.value);
                input.value = '';
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add Feature
            </button>
          </div>
        </div>

        {/* Specifications Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specifications (Key-Value Pairs)
          </label>
          <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
            {Object.entries(form.specs || {}).map(([key, value], index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex-1">
                  <span className="font-medium">{key}:</span>
                  <span className="ml-2">{value}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(formType, key)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              value={tempSpecKey}
              onChange={(e) => setTempSpecKey(e.target.value)}
              placeholder="Specification key (e.g., display, processor)"
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={tempSpecValue}
              onChange={(e) => setTempSpecValue(e.target.value)}
              placeholder="Specification value"
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="button"
            onClick={() => handleAddSpec(formType)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Add Specification
          </button>
        </div>

        {/* Variants Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Variants
          </label>
          <div className="space-y-3 mb-3 max-h-40 overflow-y-auto">
            {Object.entries(form.variants || {}).map(([variantType, variantValues]) => (
              <div key={variantType} className="bg-gray-50 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium capitalize">{variantType}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const currentVariants = { ...form.variants };
                      delete currentVariants[variantType];
                      setForm({ ...form, variants: currentVariants });
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variantValues.map((value, index) => (
                    <div key={index} className="flex items-center bg-white px-2 py-1 rounded border">
                      <span>{value}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(formType, variantType, index)}
                        className="text-red-500 hover:text-red-700 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <select
              value={tempVariantKey}
              onChange={(e) => setTempVariantKey(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select variant type</option>
              <option value="storage">Storage</option>
              <option value="ram">RAM</option>
              <option value="colors">Colors</option>
              <option value="sizes">Sizes</option>
              <option value="models">Models</option>
            </select>
            <input
              type="text"
              value={tempVariantValue}
              onChange={(e) => setTempVariantValue(e.target.value)}
              placeholder="Variant value (e.g., 128GB, Black)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && tempVariantKey) {
                  handleAddVariant(formType, tempVariantKey);
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (tempVariantKey) {
                  handleAddVariant(formType, tempVariantKey);
                }
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add Variant
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading && !products.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800 font-medium">Error loading products</div>
        <div className="text-red-600 text-sm mt-1">{error.message || error}</div>
        <button
          onClick={refetch}
          className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
        <p className="text-gray-600">Manage your product catalog ({products.length} products)</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Out of Stock</div>
          <div className="text-2xl font-bold text-gray-900">
            {products.filter(p => p.stock === 0).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Low Stock (&lt;10)</div>
          <div className="text-2xl font-bold text-gray-900">
            {products.filter(p => p.stock > 0 && p.stock < 10).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Total Value</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(products.reduce((sum, p) => sum + (p.price * p.stock), 0), 'INR')}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Clear Filters
            </button>
          </div>

          {/* Add Product Button */}
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-lg object-cover border"
                            src={product.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image'}
                            alt={product.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(product.price, product.currency)}
                      </div>
                    </td>
                    <td className=" py-4">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockColor(product.stock)}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-1 rounded hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="text-red-600 hover:text-red-900 transition-colors px-3 py-1 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Add your first product to get started'}
            </p>
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Product: {editingProduct.name}
                </h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
                    setEditForm(initialAddForm);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {renderFormFields('edit')}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
                    setEditForm(initialAddForm);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add New Product</h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setAddForm(initialAddForm);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {renderFormFields('add')}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setAddForm(initialAddForm);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts