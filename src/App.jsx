import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import { ScanProvider } from './context/ScanContext';

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

// Header component
const Header = () => (
  <header className="sticky top-0 z-30 before:content-[''] before:fixed before:top-0 before:left-0 before:w-full before:h-16 before:bg-white/80 before:dark:bg-gray-900/80 before:backdrop-blur-sm before:-z-10">
    <div className="border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            SiegeScan
          </h1>
        </div>
      </div>
    </div>
  </header>
);

// Main content wrapper that controls scrolling based on route
const MainContent = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <main className={`container mx-auto px-4 ${isHome ? 'h-[calc(100vh-8rem)] overflow-hidden' : 'py-8 pb-20'}`}>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </main>
  );
};

function App() {
  return (
    <Router>
      <ScanProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <MainContent>
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
          </MainContent>
          <Navbar />
          <Analytics />
          <SpeedInsights />
        </div>
      </ScanProvider>
    </Router>
  );
}

export default App; 