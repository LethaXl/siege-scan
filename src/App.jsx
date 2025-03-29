import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';

// Lazy load components for better performance
const Home = lazy(() => import('./components/Home'));
const Scan = lazy(() => import('./components/Scan'));
const Guide = lazy(() => import('./pages/Guide'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <main className="container mx-auto px-4 py-8 pb-20">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/scan"
                element={
                  <PageTransition>
                    <Scan />
                  </PageTransition>
                }
              />
              <Route
                path="/guide"
                element={
                  <PageTransition>
                    <Guide />
                  </PageTransition>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App; 