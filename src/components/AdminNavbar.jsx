import { ShoppingCartIcon } from 'lucide-react';
import { List, X } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserDropdown } from './UserDropdown';
import { getNavItems } from '../partials/navItems';
import { useAuth } from '../context/AuthContext';

const navItems = getNavItems;

const AdminNavBar = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn, logout, user } = useAuth();
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);

  useEffect(() => {
    if (initialAuthChecked && user) {
      // Check if user exists
      if (!isLoggedIn) {
        logout();
        navigate('/sign-in');
      } else if (user.user_type !== 'Admin') {
        logout();
        navigate('/sign-in');
      }
    } else if (!initialAuthChecked) {
      setInitialAuthChecked(true);
      // navigate("/sign-in");
    }
  }, [isLoggedIn, logout, initialAuthChecked, user]);

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

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <button onClick={() => navigate('/')}>
          {' '}
          <h1 className="text-1xl md:text-2xl font-bold">Smartech</h1>
        </button>

        {isLoggedIn ? (
          <div className="flex space-x-2 items-center ">
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
            <NavLink to="/sign-in" className="border border-primary rounded-full px-4 text-primary">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
export default AdminNavBar;
