import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import SimpleFooter from "../components/SimpleFoot";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      alert("Please accept the terms and Conditions");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/users");
      const existingUser = response.data.find(
        (user) => user.email === formData.email
      );

      if (existingUser) {
        alert("User with this email already exists");
        return;
      }

      // Register new user
      await axios.post("http://localhost:3000/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        terms: formData.terms,
      });

      // ✅ Fixed: Pass correct user data (name instead of email, no password)
      login({
        name: formData.name,  // Changed from formData.email
        email: formData.email,
      });

      navigate("/sign_in");
      
    } catch (error) {
      console.log("Registration Error:", error);
    }
  };

  const isSubmitDisable =
    !formData.name || !formData.email || !formData.password || !formData.terms;

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="flex flex-row justify-center items-center pt-4 py-15 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
          </div>
          <img
            alt="EchOo."
            src="/src/assets/images/Echoo-transparent.png"
            className="h-13 w-auto absolute"
          />
          <h2 className="mt-8 text-center text-3xl font-dm-sans font-bold tracking-tight text-black">
            Create Your Echoo Account.
          </h2>
          <p className="mt-3 text-center text-base font-serif text-gray-600">
            Or{" "}
            <Link
              to="/sign_in"
              className=" inline-flex items-center gap-1 font-vent-sans text-blue-600 hover:text-gray-700 transition-colors"
            >
              sign in to your existing account
              <ArrowUpRightIcon className="size-3" />
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-10 px-8 shadow-sm border border-gray-100 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label
                    htmlFor="yourName"
                    className="block text-sm font-normal text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div>
                    <input
                      id="yourName"
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 transition-colors"
                      placeholder="name"
                      onChange={handleChange}
                      value={formData.name}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-normal text-gray-700 mb-2"
                >
                  Email address
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 transition-colors"
                    placeholder="name@gmail.com"
                    onChange={handleChange}
                    value={formData.email}
                    required
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
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 transition-colors"
                    placeholder="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 font-light">
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  id="agree-terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded mt-0.5"
                  onChange={handleChange}
                  checked={formData.terms}
                />
                <label
                  htmlFor="agree-terms"
                  className="block text-sm text-gray-700 font-normal leading-5"
                >
                  I agree to the{" "}
                  <a
                    href="/terms_conditions"
                    className="text-gray-900 hover:text-gray-700 transition-colors underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <div>
                {/* ✅ Removed onClick from button - form onSubmit handles it */}
                <button
                  type="submit"
                  disabled={isSubmitDisable}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-base font-normal text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      <SimpleFooter />
    </div>
  );
}; // ✅ Added missing closing brace for component

export default Register;