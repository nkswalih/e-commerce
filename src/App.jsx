import React from 'react'
import Navbar from './components/NavBar/Navbar/'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/RegisterForm'
import Login from './pages/LoginForm'
import Terms from './pages/Terms'
import Store from './pages/Store'
import Apple from './pages/Apple'
import Contact from './pages/Contact'
import Laptop from './pages/Laptop'
import Test from './pages/Test'
import Profile from './pages/Profile'
import ProductPage from './pages/Product'
import StorePage from './pages/Store'
import CartPage from './pages/Cart'
import { ToastContainer } from 'react-toastify';
import './styles/toast.css';
import './index.css';

function App() {
  return (
      <BrowserRouter>
      <div>
      
      <Navbar/>
      
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/sign_up" element={<Register/>}/>
          <Route path="/sign_in" element={<Login/>}/>
          <Route path="/terms_conditions" element={<Terms/>}/>
          <Route path="/store" element={<Store/>}/>
          <Route path="/apple" element={<Apple/>}/>
          <Route path="/lap" element={<Laptop/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/store" element={<StorePage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
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