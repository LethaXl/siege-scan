import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 bottom-0 start-0 border-t border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex flex-row justify-around p-2 font-medium border-0 bg-transparent">
          <li>
            <Link
              to="/"
              className={`flex flex-col items-center py-2 px-3 rounded-sm ${
                isActive('/')
                  ? 'text-blue-700 dark:text-blue-500'
                  : 'text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500'
              }`}
            >
              <span className="text-sm">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/scan"
              className={`flex flex-col items-center py-2 px-3 rounded-sm ${
                isActive('/scan')
                  ? 'text-blue-700 dark:text-blue-500'
                  : 'text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500'
              }`}
            >
              <span className="text-sm">Scan</span>
            </Link>
          </li>
          <li>
            <Link
              to="/guide"
              className={`flex flex-col items-center py-2 px-3 rounded-sm ${
                isActive('/guide')
                  ? 'text-blue-700 dark:text-blue-500'
                  : 'text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500'
              }`}
            >
              <span className="text-sm">Guide</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 