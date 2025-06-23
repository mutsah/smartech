import { ShoppingCartIcon } from "lucide-react";
import { List, X } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserDropdown } from "./UserDropdown";
import { getNavItems } from "../partials/navItems";
import { useAuth } from "../context/AuthContext";

const navItems = getNavItems;

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const dropdownRef = useRef(null);

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

  return (
    <div className="w-full shadow-md">
      <div className="container py-2 flex justify-between items-center">
        <h1 className="text-1xl md:text-2xl font-bold">
          <span className="text-primary  text-3xl"></span>Smartech
        </h1>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((navItem, key) => (
            <NavLink
              key={key}
              to={navItem.to}
              className={`${
                pathname === navItem.to
                  ? "text-primary"
                  : "hover:text-primary transition-colors duration-300"
              }`}
            >
              {navItem.name}
            </NavLink>
          ))}
        </div>

        {/* mobile nav */}
        <div
          className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((navItem, key) => (
              <NavLink
                key={key}
                to={navItem.to}
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  pathname === navItem.to
                    ? "text-primary"
                    : "hover:text-primary transition-colors duration-300"
                }`}
              >
                {navItem.name}
              </NavLink>
            ))}
          </div>
        </div>

        {isLoggedIn ? (
          <div className="flex space-x-2 items-center ">
            <NavLink
              to="cart"
              className={`${
                pathname === "/cart"
                  ? "text-primary"
                  : "hover:text-primary transition-colors duration-300"
              }`}
            >
              <ShoppingCartIcon size={24}></ShoppingCartIcon>
            </NavLink>

            <UserDropdown></UserDropdown>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden text-foreground z-50"
            >
              {isMenuOpen ? <X size={24}></X> : <List size={24}></List>}
            </button>
          </div>
        ) : (
          <>
            <NavLink
              to="/sign-in"
              className="border border-primary rounded-full px-4 text-primary"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
export default NavBar;
