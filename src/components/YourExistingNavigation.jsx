import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  // Helper function to get active class
  const getNavClass = ({ isActive }) => {
    return `px-4 py-2 rounded-md transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              R6 Tracker
            </span>
          </div>
          <div className="flex space-x-2">
            <NavLink to="/" className={getNavClass}>
              Home
            </NavLink>
            <NavLink to="/scan" className={getNavClass}>
              Scan
            </NavLink>
            <NavLink to="/logo" className={getNavClass}>
              Logo
            </NavLink>
            <NavLink to="/about" className={getNavClass}>
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 