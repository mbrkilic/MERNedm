import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu } from "react-icons/hi";
import phone from "../assets/phone.svg";
import clock from "../assets/clock.svg";
import mail from "../assets/mail.svg";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isAuthenticated = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-10">
      <div className="flex items-center justify-evenly bg-[#f2f2f2] text-gray-500 p-4 gap-2 flex-col sm:flex-row">
        <p className="flex text-xs sm:text-sm items-center sm:flex-wrap">
          <img src={clock} alt="" className="w-4 sm:w-6 mr-2" />
          Opening Times: Sun - Sat 07:00 - 21:00
        </p>
        <p className="flex text-xs sm:text-sm items-center sm:flex-wrap">
          <img src={phone} alt="" className="w-4 sm:w-6 mr-2" />
          +90 555 555 55 55
        </p>
        <p className="flex text-xs sm:text-sm items-center sm:flex-wrap">
          <img src={mail} alt="" className="w-4 sm:w-6 mr-2" />
          ornek@email.com
        </p>
      </div>

      <div
        className={`container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 ${
          isHomePage ? "bg-transparent" : "sm:bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img 
            src={isHomePage ? logoWhite : logo} 
            alt="EDM Flooring" 
            width="80" 
          />
          <p className={`font-bold text-2xl ${
            isHomePage ? "text-white" : "text-black"
          }`}>
            EDM Flooring
          </p>
        </Link>

        <div className="items-center gap-3 hidden lg:flex">
          <ul className={`capitalize flex space-x-6 text-lg mr-auto mt-2 font-semibold ${
            isHomePage ? "text-white" : "text-black"
          }`}>
            <li className="cursor-pointer hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link to="/gallery">Gallery</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link to="/contact">Contact</Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="cursor-pointer hover:underline">
                  <Link to="/upload">Upload</Link>
                </li>
                <li className="cursor-pointer hover:underline">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
            
          </ul>
        </div>

        <button
          onClick={toggleMenu}
          className={`lg:hidden text-3xl justify-center items-center cursor-pointer ${
            isHomePage ? "text-white" : "text-black"
          }`}
        >
          <HiMenu />
        </button>

        {isMenuOpen && (
          <div className="bg-white mt-11 absolute left-0 right-0 top-[50px] flex justify-center items-center shadow-lg">
            <ul className="flex flex-col text-lg font-semibold capitalize my-6 space-y-4">
              <li onClick={handleMenuItemClick}>
                <Link to="/" className="hover:text-gray-600">Home</Link>
              </li>
              <li onClick={handleMenuItemClick}>
                <Link to="/gallery" className="hover:text-gray-600">Gallery</Link>
              </li>
              {isAuthenticated && (
                <>
                  <li onClick={handleMenuItemClick}>
                    <Link to="/upload" className="hover:text-gray-600">Upload</Link>
                  </li>
                  <li onClick={handleLogout}>
                    <button className="hover:text-gray-600">Logout</button>
                  </li>
                </>
              )}
              <li onClick={handleMenuItemClick}>
                <Link to="/contact" className="hover:text-gray-600">Contact</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 