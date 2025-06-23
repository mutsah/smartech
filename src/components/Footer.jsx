import { Envelope, MapPin, Phone } from "phosphor-react";
import { NavLink, useLocation } from "react-router-dom";
import { getNavItems } from "../partials/navItems";

const navItems = getNavItems;

export const Footer = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <footer className="">
      <div className="container py-6 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h3 className="text-1xl md:text-2xl font-bold mb-6">Smartech</h3>
          <p className="py">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quasi
            ab doloribus quis soluta ipsum dolores cumque odit, beatae eligendi!
            ipsum dolor sit amet consectetur adipisicing elit. Sunt quasi ab
            doloribus quis soluta ipsum dolores cumque odit, beatae eligendi!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h3 className="font-bold mb-8">Company</h3>
            <div className="flex flex-col space-y-4">
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
          </div>
          <div>
            <h3 className="font-bold mb-8">Get In Touch</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Phone size={20} className="text-primary"></Phone>
                <p>+263 78 509 4296</p>
              </div>
              <div className="flex items-center space-x-2">
                <Envelope size={20} className="text-primary"></Envelope>
                <p>taringamutsah@gmail.com</p>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-primary"></MapPin>
                <p>123 2nd Street, Harare, Zimbabwe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 text-center border">
        Copyright {new Date().getFullYear()} &copy; Netek, All Rights Reserved
      </div>
    </footer>
  );
};
