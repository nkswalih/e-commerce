import { toast } from "react-toastify"


const AdminProducts = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600">Manage your product catalog</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Products Management</h2>
        <p className="text-gray-600 mb-4">This is where you would manage your products</p>
        <button 
          onClick={() => toast.success('Product feature coming soon!')}
          className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          Add Product
        </button>
      </div>
    </div>
  )
}

export default AdminProducts