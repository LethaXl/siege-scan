import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to SiegeScan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Extract player information from Rainbow Six Siege scoreboard images
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-300">
          <li>Take a screenshot of the Rainbow Six Siege scoreboard</li>
          <li>Upload the image to SiegeScan</li>
          <li>Get instant access to player profiles and statistics</li>
        </ol>
      </div>

      <div className="text-center">
        <Link
          to="/scan"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Start Scanning
        </Link>
      </div>
    </div>
  );
};

export default Home; 