import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const handleSliderClick = () => {
    setIsSliderOpen(prev => !prev);
  }
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <NavLink to="/" className="text-xl font-bold">
          Lumos Library
        </NavLink>

        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/shop" className="text-white hover:text-gray-300">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="text-white hover:text-gray-300">
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="md:hidden" onClick={handleSliderClick}>
          <button className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isSliderOpen ? (<div className="md:hidden bg-gray-700">
        <ul className="flex flex-col space-y-2 py-2 px-4">
          <li>
            <NavLink
              to="/shop"
              className="block text-white hover:text-gray-300"
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="block text-white hover:text-gray-300"
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>) : null}
      
    </header>
  );
};

export default Header;
