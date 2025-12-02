import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useApi from '../../../hooks/useApi'
import { useNavigate } from 'react-router-dom'

const AdminOrders = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const { 
    data: orders = [], 
    loading, 
    error, 
    refetch,
    patchData 
  } = useApi("orders");

  // Get users data to update user's orders
  const { 
    data: users = [],
    refetch: refetchUsers,
    patchData: patchUserData 
  } = useApi("users");

  // Get current user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchesPayment = selectedPaymentMethod === 'all' || 
        (order.paymentMethod || order.customerInfo?.paymentMethod) === selectedPaymentMethod;
      
      // Date filtering
      const orderDate = new Date(order.date);
      const now = new Date();
      let matchesDate = true;
      
      switch(dateFilter) {
        case 'today':
          matchesDate = orderDate.toDateString() === now.toDateString();
          break;
        case 'this-week':
          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          matchesDate = orderDate >= startOfWeek;
          break;
        case 'this-month':
          matchesDate = orderDate.getMonth() === now.getMonth() && 
                       orderDate.getFullYear() === now.getFullYear();
          break;
        default:
          matchesDate = true;
      }
      
      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'total-high':
          return b.total - a.total;
        case 'total-low':
          return a.total - b.total;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  // View order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  // Update order status in both orders and users/orders
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // Update in orders collection
      await patchData(orderId, { status: newStatus });
      
      // Find the user who placed this order
      const orderToUpdate = orders.find(order => order.id === orderId);
      if (orderToUpdate?.userId) {
        // Find the user
        const user = users.find(u => u.id === orderToUpdate.userId);
        if (user) {
          // Update the order in user's orders array
          const updatedUserOrders = user.order.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
          );
          
          // Update user data
          await patchUserData(user.id, { order: updatedUserOrders });
        }
      }
      
      toast.success(`Order status updated to ${newStatus}`);
      refetch(); // Refresh orders data
      refetchUsers(); // Refresh users data
      
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Error updating order status:', error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status options
  const statusOptions = [
    'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'
  ];

  // Get payment method color
  const getPaymentColor = (method) => {
    switch (method?.toLowerCase()) {
      case 'card':
      case 'credit':
        return 'bg-purple-100 text-purple-800';
      case 'upi':
        return 'bg-blue-100 text-blue-800';
      case 'cod':
        return 'bg-orange-100 text-orange-800';
      case 'netbanking':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate statistics
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed' || o.status === 'delivered').length,
    averageOrderValue: orders.length > 0 ? 
      Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length) : 0
  };

  if (loading && !orders.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-gray-600">Loading orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800 font-medium">Error loading orders</div>
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
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600">Manage and update customer orders ({orders.length} orders)</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Pending Orders</div>
          <div className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Avg. Order Value</div>
          <div className="text-2xl font-bold text-gray-900">{formatPrice(stats.averageOrderValue)}</div>
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
                placeholder="Search by Order ID, Customer Name, or Email..."
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              <option value="all">All Status</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              <option value="all">All Payments</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="cod">COD</option>
              <option value="netbanking">Net Banking</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="total-high">Total: High to Low</option>
              <option value="total-low">Total: Low to High</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
                setSelectedPaymentMethod('all');
                setDateFilter('all');
                setSortBy('newest');
              }}
              className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
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
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(order.date)}
                        </div>
                        <div className="mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentColor(order.paymentMethod || order.customerInfo?.paymentMethod)}`}>
                            {order.paymentMethod || order.customerInfo?.paymentMethod || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.userName || order.customerInfo?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.userEmail || order.customerInfo?.email || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.items?.length || 0} items
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items?.slice(0, 2).map((item, idx) => (
                          <span key={idx} className="block truncate max-w-[200px]">
                            {item.quantity}x {item.productName}
                          </span>
                        ))}
                        {order.items?.length > 2 && (
                          <span className="text-gray-400">+{order.items.length - 2} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(order.total)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Subtotal: {formatPrice(order.subtotal)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-1 py-1 focus:ring-0 bg-transparent border-none"
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-600 hover:text-blue-900 transition-colors px-3 py-1 rounded hover:bg-blue-50"
                      >
                        View
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedStatus !== 'all' || selectedPaymentMethod !== 'all' || dateFilter !== 'all'
                ? 'Try adjusting your filters' 
                : 'No orders have been placed yet'}
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                  <p className="text-sm text-gray-500">#{selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedOrder(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium">{formatDate(selectedOrder.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentColor(selectedOrder.paymentMethod || selectedOrder.customerInfo?.paymentMethod)}`}>
                        {selectedOrder.paymentMethod || selectedOrder.customerInfo?.paymentMethod || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Total</p>
                      <p className="font-medium">{formatPrice(selectedOrder.total)}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedOrder.userName || selectedOrder.customerInfo?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedOrder.userEmail || selectedOrder.customerInfo?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedOrder.customerInfo?.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Shipping Address</p>
                      <p className="font-medium">
                        {selectedOrder.customerInfo?.address}, {selectedOrder.customerInfo?.city}, 
                        {selectedOrder.customerInfo?.state} - {selectedOrder.customerInfo?.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Order Items ({selectedOrder.items?.length || 0})</h4>
                  <div className="space-y-4">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex items-center border-b pb-4">
                        <div className="h-16 w-16 flex-shrink-0">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900">{item.productName}</h5>
                              <p className="text-sm text-gray-500">{item.productBrand}</p>
                              <p className="text-sm text-gray-500">
                                Storage: {item.storage} • Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{formatPrice(item.productPrice)}</p>
                              <p className="text-sm text-gray-500">Total: {formatPrice(item.itemTotal)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Totals */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">{formatPrice(selectedOrder.shipping || 0)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t pt-2">
                      <span>Total</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end pt-6 border-t mt-6">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedOrder(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders