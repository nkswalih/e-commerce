import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import AuthButton from "../ui/AuthButton";
import SearchDropdown from "../ui/SearchDropDown.jsx";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isAuthenticated, user } = useAuth(); // ✅ Fixed spelling

  const navItems = [
    { path: "/store", label: "Store" },
    { path: "/apple", label: "Apple" },
    { path: "/laptop", label: "Lap" },
    { path: "/accessories", label: "Accessories" },
    { path: "/support", label: "Support" },
  ];

  const NavLinkStyle = ({ isActive }) =>
    `text-xs font-normal transition-colors duration-200 ${
      isActive
        ? "text-gray-700 border-gray-900"
        : "text-gray-700 hover:text-gray-900 border-transparent"
    }`;

  return (
    <div className="bg-white/70 sticky top-0 z-50 shadow-sm border-b border-gray-100/15 lg:backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-11 items-center justify-between">
          <div className="flex justify-center items-center gap-10">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                alt="EchOo."
                src="/src/assets/images/Echoo-transparent.png"
                className="h-6 w-auto"
              />
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-9">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={NavLinkStyle}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center">
            <div className="flex items-center gap-5">
              {/* SEARCH BAR */}
              <Link
                className="p-1.5 text-gray-400 hover:text-gray-500 transition-colors flex items-center justify-center"
              >
                <SearchDropdown/>
              </Link>

              <Link
                to="/cart"
                className="p-1.5 text-gray-400 hover:text-gray-500 transition-colors flex items-center justify-center"
              >
                <ShoppingBagIcon className="size-4 stroke-gray-700" />
              </Link>

              {/* Authentication button */}
              <div className="nav-auth-section flex items-center justify-center">
                {isAuthenticated ? ( // ✅ Fixed spelling
                  <Link
                    to="/profile" // ✅ Changed from "/cart" to "/profile"
                    className="p-1.5 text-gray-400 hover:text-gray-500 transition-colors flex items-center justify-center"
                  >
                    <UserCircleIcon className="size-4 stroke-gray-700" />
                  </Link>
                ) : (
                  <AuthButton />
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-gray-500 transition-colors ml-4"
            >
              <Bars3Icon className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-opacity-25"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="size-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 text-sm font-normal ${
                      isActive
                        ? "text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* AuthenticationNav */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {isAuthenticated ? ( // ✅ Fixed spelling for mobile too
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Profile
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/sign_in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/sign_up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}