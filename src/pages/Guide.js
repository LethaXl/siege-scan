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
  ExclamationTriangleIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const Guide = () => {
  const faqs = [
    {
      question: "What image formats are supported?",
      answer: "SiegeScan supports common image formats including JPG and PNG. For best results, we recommend using high-quality screenshots of the Rainbow Six Siege scoreboard."
    },
    {
      question: "What if the scan is inaccurate?",
      answer: "If you're experiencing inaccurate scans, try the following: 1) Ensure good lighting conditions when taking the photo, 2) Keep your phone steady and avoid motion blur, 3) Make sure the scoreboard is clearly visible, 4) Use a higher resolution image if possible. You can also manually edit any incorrectly scanned usernames."
    },
    {
      question: "What platforms are supported?",
      answer: "SiegeScan is primarily optimized for console lobbies (PSN, XBL, Nintendo Switch). While PC lobbies are supported, the scanning accuracy may vary due to different UI layouts and text styles."
    },
    {
      question: "How do I change a player's platform?",
      answer: "You can tap on the platform logo next to a player's name to quickly switch between platforms (PSN, XBL, Nintendo Switch, PC). This is faster than using the edit button for platform changes."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How to Use SiegeScan</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Your mobile-optimized tool for scanning Rainbow Six Siege scoreboards</p>
      </div>

      {/* Mobile Optimization Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
        <div className="flex items-center">
          <DevicePhoneMobileIcon className="h-5 w-5 text-blue-500 mr-2" />
          <p className="text-blue-700 dark:text-blue-300">
            SiegeScan is optimized for mobile use, making it perfect for quickly scanning scoreboards from your phone's camera.
          </p>
        </div>
      </div>

      {/* Step-by-Step Tutorial */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <DocumentTextIcon className="h-6 w-6 mr-2 text-blue-500" />
          Step-by-Step Tutorial
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">1. Take a Photo</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Use your phone's camera to take a clear photo of the Rainbow Six Siege scoreboard. Make sure all player names are visible.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">2. Upload or Capture</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Choose to upload an existing photo or use the camera directly in the app. The app will automatically detect the scoreboard.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">3. Review & Edit</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Review the scanned usernames. You can edit any incorrect names or tap the platform logo to change platforms.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">4. View Stats</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Click on any username to view their detailed Rainbow Six Siege statistics on R6 Tracker.</p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-500" />
          Best Practices
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <SunIcon className="h-6 w-6 text-yellow-500 mb-2" />
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">Lighting</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Ensure good lighting when taking photos. Avoid glare on your screen and keep the room well-lit.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <DocumentCheckIcon className="h-6 w-6 text-green-500 mb-2" />
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">Positioning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Hold your phone steady and ensure the scoreboard is centered in the frame. Avoid tilted angles.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <ArrowUpTrayIcon className="h-6 w-6 text-blue-500 mb-2" />
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">Resolution</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Use your phone's highest quality camera settings. Higher resolution means better text recognition.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <DocumentDuplicateIcon className="h-6 w-6 text-purple-500 mb-2" />
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">Platform</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Best results for console lobbies. PC lobbies may require manual username entry.</p>
          </div>
        </div>
      </section>

      {/* Example Images Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <PhotoIcon className="h-6 w-6 mr-2 text-green-500" />
          Example Images
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">Good Example</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2 overflow-hidden">
              <img 
                src="/guide-images/good-example.jpg" 
                alt="Good scoreboard scanning example"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-300">This image demonstrates:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-0.5">
                <li>Clear view of the scoreboard</li>
                <li>Well-lit screen</li>
                <li>Steady camera position</li>
                <li>No screen glare</li>
              </ul>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2 flex items-center">
              <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-1" />
              Problematic Example
            </h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2 overflow-hidden">
              <img 
                src="/guide-images/bad-example.jpg" 
                alt="Problematic scoreboard scanning example"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-300">This image shows common issues:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-0.5">
                <li>Screen glare and reflections</li>
                <li>Blurry or shaky image</li>
                <li>Poor lighting conditions</li>
                <li>Tilted or off-center scoreboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <QuestionMarkCircleIcon className="h-6 w-6 mr-2 text-purple-500" />
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <Disclosure.Button className="flex w-full justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none">
                    <span>{faq.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-4 w-4 text-gray-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-3 pb-2 text-xs text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Guide; 