import React, { lazy, Suspense, createContext, useContext, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Import only critical components (above the fold)
import { PageLayout } from '../../../libs/consultation/frontend/components/layout/page-layout';
import { HomePage } from '../../../libs/consultation/frontend/pages/home/index';
import CustomLoader from '../../../libs/consultation/frontend/components/ui/CustomLoader';

// Lazy load all other pages for better performance
const ServicesPage = lazy(() => import('../../../libs/consultation/frontend/pages/services/index').then(m => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import('../../../libs/consultation/frontend/pages/about/index').then(m => ({ default: m.AboutPage })));
const FAQPage = lazy(() => import('../../../libs/consultation/frontend/pages/faq/index').then(m => ({ default: m.FAQPage })));
const ContactPage = lazy(() => import('../../../libs/consultation/frontend/pages/contact/index').then(m => ({ default: m.ContactPage })));
const BookingPage = lazy(() => import('../../../libs/consultation/frontend/pages/booking/index').then(m => ({ default: m.BookingPage })));

// Lazy load service detail pages
const ApplicationDevelopmentPage = lazy(() => import('../../../libs/consultation/frontend/pages/services/application-development-page'));
const DigitalMarketingPage = lazy(() => import('../../../libs/consultation/frontend/pages/services/digital-marketing-page'));
const SupportMaintenancePage = lazy(() => import('../../../libs/consultation/frontend/pages/services/support-maintenance-page'));

// Lazy load legal pages
const PrivacyPolicyPage = lazy(() => import('../../../libs/consultation/frontend/pages/legal/privacy-policy-page'));
const TermsOfServicePage = lazy(() => import('../../../libs/consultation/frontend/pages/legal/terms-of-service-page'));
const CookiePolicyPage = lazy(() => import('../../../libs/consultation/frontend/pages/legal/cookie-policy-page'));
const GdprPage = lazy(() => import('../../../libs/consultation/frontend/pages/legal/gdpr-page'));

// Global Loading Context
const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
});

// Global Loading Provider
const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Global Loading Component
const GlobalLoader = () => {
  const { isLoading } = useContext(LoadingContext);

  if (!isLoading) return null;

  return (
    <CustomLoader
      message="Loading"
      subMessage="Preparing your experience..."
    />
  );
};

// Route Transition Loader - Shows loading screen during route changes
const RouteTransitionLoader: React.FC = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const location = useLocation();

  useEffect(() => {
    // Show loading screen when route changes
    setIsLoading(true);

    // Hide loading screen after a short delay (to allow for smooth transitions)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms delay for smooth transition

    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading]);

  return null; // This component doesn't render anything visible
};

// Loading fallback component - Premium custom loader
const PageLoader = () => <CustomLoader message="Loading Page" subMessage="Preparing your experience..." />;

/**
 * APPLE REDESIGN - App Routes
 * Clean, simplified route structure with lazy loading for performance
 */

export function App() {
  return (
    <LoadingProvider>
      <RouteTransitionLoader />
      <GlobalLoader />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main routes - Homepage is not lazy loaded (critical) */}
          <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />

          {/* Services routes - Lazy loaded */}
          <Route path="/services" element={<PageLayout><Suspense fallback={<PageLoader />}><ServicesPage /></Suspense></PageLayout>} />
          <Route path="/services/application-development" element={<PageLayout><Suspense fallback={<PageLoader />}><ApplicationDevelopmentPage /></Suspense></PageLayout>} />
          <Route path="/services/digital-marketing" element={<PageLayout><Suspense fallback={<PageLoader />}><DigitalMarketingPage /></Suspense></PageLayout>} />
          <Route path="/services/support-maintenance" element={<PageLayout><Suspense fallback={<PageLoader />}><SupportMaintenancePage /></Suspense></PageLayout>} />

          {/* About route - Lazy loaded */}
          <Route path="/about" element={<PageLayout><Suspense fallback={<PageLoader />}><AboutPage /></Suspense></PageLayout>} />
          <Route path="/about/*" element={<PageLayout><Suspense fallback={<PageLoader />}><AboutPage /></Suspense></PageLayout>} />

          {/* Legal routes - Lazy loaded */}
          <Route path="/legal/privacy-policy" element={<PageLayout><Suspense fallback={<PageLoader />}><PrivacyPolicyPage /></Suspense></PageLayout>} />
          <Route path="/legal/terms-of-service" element={<PageLayout><Suspense fallback={<PageLoader />}><TermsOfServicePage /></Suspense></PageLayout>} />
          <Route path="/legal/cookie-policy" element={<PageLayout><Suspense fallback={<PageLoader />}><CookiePolicyPage /></Suspense></PageLayout>} />
          <Route path="/legal/gdpr" element={<PageLayout><Suspense fallback={<PageLoader />}><GdprPage /></Suspense></PageLayout>} />

          {/* Other routes - Lazy loaded */}
          <Route path="/faq" element={<PageLayout><Suspense fallback={<PageLoader />}><FAQPage /></Suspense></PageLayout>} />
          <Route path="/contact" element={<PageLayout><Suspense fallback={<PageLoader />}><ContactPage /></Suspense></PageLayout>} />
          <Route path="/booking" element={<PageLayout><Suspense fallback={<PageLoader />}><BookingPage /></Suspense></PageLayout>} />

          {/* Catch-all route - redirect to home */}
          <Route path="*" element={<PageLayout><HomePage /></PageLayout>} />
        </Routes>
      </Suspense>
    </LoadingProvider>
  );
}

export default App;
