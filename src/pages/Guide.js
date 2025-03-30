import React from 'react';
import { 
  DocumentTextIcon, 
  PhotoIcon, 
  LightBulbIcon, 
  QuestionMarkCircleIcon,
  ArrowUpTrayIcon,
  DocumentCheckIcon,
  SunIcon,
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

const Guide = () => {
  const faqs = [
    {
      question: "What image formats are supported?",
      answer: "SiegeScan supports common image formats including JPG and PNG."
    },
    {
      question: "What platforms are supported?",
      answer: "SiegeScan is primarily optimized for console lobbies (PlayStation, Xbox). While PC lobbies are supported, the scanning accuracy may be inaccurate."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-0">
      {/* Step-by-Step Tutorial */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-500" />
          Getting Started
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-blue-600 dark:text-blue-300 text-xs font-semibold">1</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Take a Photo</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Use your phone's camera to take a clear photo of the Rainbow Six Siege scoreboard.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-blue-600 dark:text-blue-300 text-xs font-semibold">2</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Upload or Capture</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Choose to upload an existing photo or use the camera directly in the app.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-blue-600 dark:text-blue-300 text-xs font-semibold">3</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Review & Edit</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Review the scanned usernames and edit any incorrect names.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                <span className="text-blue-600 dark:text-blue-300 text-xs font-semibold">4</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">View Stats</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Click on the icon <ArrowTopRightOnSquareIcon className="h-3 w-3 text-gray-600 dark:text-gray-300 inline" /> to view their detailed statistics on R6 Tracker.</p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <LightBulbIcon className="h-5 w-5 mr-2 text-yellow-500" />
          Helpful Tips
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <SunIcon className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Lighting</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Ensure even lighting and minimize glare for clearer results.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <DocumentCheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Positioning</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Keep your phone steady and center the scoreboard in frame.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <ArrowUpTrayIcon className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Resolution</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Use highest quality camera settings for better text recognition.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-2">
              <DocumentDuplicateIcon className="h-5 w-5 text-purple-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Platform</h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Best results for console lobbies. PC may need manual entry/edits.</p>
          </div>
        </div>
      </section>

      {/* Example Images Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <PhotoIcon className="h-5 w-5 mr-2 text-green-500" />
          Example Image
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 col-span-2">
            <div className="max-w-lg mx-auto">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                <img 
                  src="/example.jpg" 
                  alt="Good scoreboard scanning example"
                  className="w-full h-full object-contain max-h-[200px]"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-300">This image demonstrates:</p>
                <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
                  <li>Clear view of the scoreboard</li>
                  <li>Well-lit screen</li>
                  <li>Steady camera position</li>
                  <li>No screen glare</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <QuestionMarkCircleIcon className="h-5 w-5 mr-2 text-purple-500" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <button
                onClick={() => {
                  const buttons = document.querySelectorAll('.faq-button');
                  const panels = document.querySelectorAll('.faq-panel');
                  
                  // Toggle only the current FAQ without affecting others
                  const currentButton = buttons[index];
                  const currentPanel = panels[index];
                  
                  currentButton.setAttribute('aria-expanded', 
                    currentButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
                  );
                  
                  currentPanel.style.display = currentPanel.style.display === 'none' ? 'block' : 'none';
                }}
                className="faq-button flex w-full justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span>{faq.question}</span>
                <ChevronUpIcon
                  className="h-3 w-3 text-gray-500 transform transition-transform duration-200"
                  style={{
                    transform: 'rotate(0deg)'
                  }}
                />
              </button>
              <div className="faq-panel px-3 pb-2 text-xs text-gray-600 dark:text-gray-300" style={{ display: 'none' }}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Guide; 