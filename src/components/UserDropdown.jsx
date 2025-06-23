import React, { useState, useRef, useEffect } from "react";
import { User, ShoppingCart, Package, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const UserDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    if (user.user_type == "Admin") {
      navigate("/sign-in");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (action) => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon Button */}
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
      >
        <User className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Profile Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">
                  <User></User>
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => handleMenuClick("cart")}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3"
            >
              <ShoppingCart className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Cart</span>
            </button>

            <button
              onClick={() => handleMenuClick("my-orders")}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3"
            >
              <Package className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">My Orders</span>
            </button>

            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={() => handleLogoutClick()}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3"
              >
                <>
                  <LogOut className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Sign out</span>
                </>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
