import React from 'react'
import Navbar from './components/NavBar/Navbar/'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/user/Home'
import Register from './pages/user/RegisterForm'
import Login from './pages/user/LoginForm'
import Terms from './pages/user/Terms'
import Store from './pages/user/Store'
import Apple from './pages/user/Apple'
import Laptop from './pages/user/Laptop'
import Test from './pages/user/Test'
import Profile from './pages/user/Profile'
import ProductPage from './pages/user/Product'
import StorePage from './pages/user/Store'
import CartPage from './pages/user/Cart'
import { ToastContainer } from 'react-toastify';
import './styles/toast.css';
import './index.css';
import LaptopPage from './pages/user/Laptop'
import CheckoutPage from './components/OrderPage/Checkout'
import OrderConfirmation from './components/OrderPage/OrderConfirmation'
import AccessoriesPage from './pages/user/Accessories'
import EchooSupport from './pages/user/Support'

// Admin imports
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminProducts from './pages/admin/AdminProducts'
import AdminSettings from './pages/admin/AdminSettings'
import UserLayout from './pages/user/UserLayout'

function App() {
  return (
      <BrowserRouter>
      <div>

      {/* User Side */}

        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/sign_up" element={<Register/>}/>
            <Route path="/sign_in" element={<Login/>}/>
            <Route path="/terms_conditions" element={<Terms/>}/>
            <Route path="/store" element={<Store/>}/>
            <Route path="/apple" element={<Apple/>}/>
            <Route path="/lap" element={<Laptop/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/store" element={<StorePage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/laptop" element={<LaptopPage/>}/>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/support" element={<EchooSupport />} />
          </Route>

        {/* Admin Side */}

        
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

        </Routes>

      

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
            zIndex: 9999,
          }}
        />
      </div>
      </BrowserRouter>
      
  )
}

export default App