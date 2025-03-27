import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About SiegeScan
        </h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              What is SiegeScan?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              SiegeScan is a web application designed to extract text from images of Rainbow Six Siege scoreboards, 
              making it easier to access player statistics and team compositions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>OCR using Google Cloud Vision API</li>
              <li>Player stats lookup via R6 Tracker</li>
              <li>Interactive UI with dark mode support</li>
              <li>Mobile-optimized design</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Future Enhancements
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Match history tracking</li>
              <li>Advanced analytics</li>
              <li>Multilingual support</li>
              <li>Team composition analysis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Technologies Used
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>React.js</li>
              <li>Tailwind CSS</li>
              <li>Google Cloud Vision API</li>
              <li>R6 Tracker API</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 