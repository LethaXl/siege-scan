import React from 'react';

const Home = () => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      {/* Main Content Container */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">Capture</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Take a photo of your scoreboard</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">Process</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">AI-powered text recognition</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">View</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Access player profiles instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 