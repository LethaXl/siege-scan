import React from 'react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center px-4 pt-8 pb-20">
      {/* Main Content Container */}
      <div className="w-full max-w-4xl flex flex-col items-center space-y-8 sm:space-y-8 space-y-4 landscape:space-y-4">
        {/* Description */}
        <div className="text-center space-y-2 mb-4 landscape:mb-2 mb-2 sm:mb-4">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 landscape:text-base">
            Scan your Rainbow Six Siege scoreboard to instantly get player profile links.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 landscape:text-xs">
            Optimized for console lobbies and mobile devices.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 landscape:gap-2 w-full landscape:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 landscape:p-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 landscape:w-8 landscape:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3 sm:mb-4 landscape:mb-2 mx-auto">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 landscape:w-4 landscape:h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg landscape:text-sm font-semibold text-gray-900 dark:text-white text-center mb-1 sm:mb-2 landscape:mb-1">Capture</h3>
            <p className="text-xs sm:text-sm landscape:text-xs text-gray-600 dark:text-gray-300 text-center">Take a photo of your scoreboard</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 landscape:p-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 landscape:w-8 landscape:h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3 sm:mb-4 landscape:mb-2 mx-auto">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 landscape:w-4 landscape:h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg landscape:text-sm font-semibold text-gray-900 dark:text-white text-center mb-1 sm:mb-2 landscape:mb-1">Process</h3>
            <p className="text-xs sm:text-sm landscape:text-xs text-gray-600 dark:text-gray-300 text-center">AI-powered text recognition</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 landscape:p-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 landscape:w-8 landscape:h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-3 sm:mb-4 landscape:mb-2 mx-auto">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 landscape:w-4 landscape:h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg landscape:text-sm font-semibold text-gray-900 dark:text-white text-center mb-1 sm:mb-2 landscape:mb-1">View</h3>
            <p className="text-xs sm:text-sm landscape:text-xs text-gray-600 dark:text-gray-300 text-center">Access player profiles instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 