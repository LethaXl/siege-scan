import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 start-0 w-full z-30 before:content-[''] before:fixed before:bottom-0 before:left-0 before:w-full before:h-12 before:bg-white/80 before:dark:bg-gray-900/80 before:backdrop-blur-sm before:-z-10">
      <div className="border-t border-gray-200/50 dark:border-gray-700/50 h-12 flex items-center">
        <div className="max-w-screen-xl mx-auto w-full">
          <ul className="flex flex-row justify-around font-medium border-0 bg-transparent">
            <li>
              <Link
                to="/"
                className={`flex items-center px-3 ${
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
                className={`flex items-center px-3 ${
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
                className={`flex items-center px-3 ${
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
      </div>
    </nav>
  );
};

export default Navbar; 