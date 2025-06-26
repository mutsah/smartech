import { ShoppingCartIcon } from 'lucide-react';
import { List, X } from 'phosphor-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserDropdown } from './UserDropdown';
import { getNavItems } from '../partials/navItems';
import { useAuth } from '../context/AuthContext';
import { ShopContext } from '../context/ShopContext';

const navItems = getNavItems;

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const { cartItems } = useContext(ShopContext);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Calculate total items in cart
  const totalCartItems = cartItems?.length || 0;

  return (
    <div className="w-full shadow-md">
      <div className="container py-2 flex justify-between items-center">
        <button onClick={() => navigate('/')}>
          {' '}
          <h1 className="text-1xl md:text-2xl font-bold">Smartech</h1>
        </button>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((navItem, key) => (
            <NavLink
              key={key}
              to={navItem.to}
              className={`${
                pathname === navItem.to
                  ? 'text-primary'
                  : 'hover:text-primary transition-colors duration-300'
              }`}
            >
              {navItem.name}
            </NavLink>
          ))}
        </div>

        {/* mobile nav */}
        <div
          className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
                    ? 'text-primary'
                    : 'hover:text-primary transition-colors duration-300'
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
              className={`relative ${
                pathname === '/cart'
                  ? 'text-primary'
                  : 'hover:text-primary transition-colors duration-300'
              }`}
            >
              <ShoppingCartIcon size={24} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems > 99 ? '99+' : totalCartItems}
                </span>
              )}
            </NavLink>

            <UserDropdown />
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden text-foreground z-50"
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        ) : (
          <>
            <NavLink to="/sign-in" className="border border-primary rounded-full px-4 text-primary">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
export default NavBar;
