import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import SimpleFooter from "../../components/SimpleFoot";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const { login } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail'); 
    const savedPassword = localStorage.getItem('rememberedPassword'); 

   
    if (savedEmail && savedPassword) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        password: savedPassword,
        rememberMe: true
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get all users from json
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;

      // Finding user with matched email and password
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      

      if (user) {
        // Store data into localStorage if remember me checked
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
          localStorage.setItem('rememberedPassword', formData.password);
        } else {
          
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }

        // Store current session
        localStorage.setItem('currentUser', JSON.stringify(user));

        
        login({
          name: user.name,
          email: user.email 
        });

        
        toast.success(`Login successful! Welcome ${user.name}!`);
        navigate("/");

      } else {
        toast.error("Invalid email or password");
      }

    } catch (error) {
      console.log("Login error:", error);
      toast.error('Login Failed. Please try again.');
    }
  };

  const isSubmitDisable = !formData.email || !formData.password;

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="flex flex-row items-center justify-center pt-24 py-28 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
          </div>
          <img
            alt="EchOo."
            src="/src/assets/images/Echoo-transparent.png"
            className="h-10 w-auto absolute"
          />
          <h2 className="mt-8 text-center text-4xl font-dm-sans font-bold tracking-tight text-black">
            Sign in to EchOo store.
          </h2>
          <p className="mt-2 text-center text-base font-serif text-gray-600">
            Or{" "}
            <Link
              to="/sign_up"
              className=" inline-flex items-center gap-1 font-vent-sans text-blue-600 hover:text-gray-700 transition-colors"
            >
              create a new account
              <ArrowUpRightIcon className="size-3" />
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-10 px-8 shadow-sm border border-gray-100 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-normal text-gray-700 mb-2"
                >
                  Email address
                </label>
                <div>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 transition-colors"
                    placeholder="name@gmail.com"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-normal text-gray-700 mb-2"
                >
                  Password
                </label>
                <div>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 transition-colors"
                    placeholder="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                    onChange={handleChange}
                    checked={formData.rememberMe}
                  />
                  <label
                    htmlFor="remember-me"
                    className="block text-sm text-gray-700 font-normal"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitDisable}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-base font-normal text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
      <SimpleFooter />
    </div>
  );
};

export default Login;