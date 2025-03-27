import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function TabNavigation() {
  const location = useLocation();
  
  const tabs = [
    { name: 'Player Scan', path: '/' },
    { name: 'Logo Detection', path: '/logo-detection' }
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow mb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {tabs.map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  location.pathname === tab.path
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabNavigation; 