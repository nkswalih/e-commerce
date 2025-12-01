import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    revenue: 0,
    orders: 0
  })

  useEffect(() => {
    // Simulate data loading
    setStats({
      totalUsers: 1245,
      totalProducts: 89,
      revenue: 45231,
      orders: 367
    })
    
    const hasShownToast = sessionStorage.getItem('dashboard_toast_shown')
  
    if (!hasShownToast) {
        toast.success('Dashboard loaded successfully!')
        sessionStorage.setItem('dashboard_toast_shown', 'true')
  }
  }, [])

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon="👥" 
          color="bg-blue-100" 
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon="📦" 
          color="bg-green-100" 
        />
        <StatCard 
          title="Revenue" 
          value={stats.revenue} 
          icon="💰" 
          color="bg-purple-100" 
        />
        <StatCard 
          title="Orders" 
          value={stats.orders} 
          icon="🛒" 
          color="bg-orange-100" 
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New user registration</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <button 
                onClick={() => toast.success('Action completed!')}
                className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard