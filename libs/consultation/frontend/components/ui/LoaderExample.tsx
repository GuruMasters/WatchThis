import React, { useState, useEffect } from 'react';
import CustomLoader from './CustomLoader';

/**
 * Example component showing how to use CustomLoader
 * 
 * Usage:
 * 1. Import CustomLoader
 * 2. Use loading state to control when it shows
 * 3. Customize message and subMessage props
 */

const LoaderExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Hide after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <CustomLoader 
        message="Loading Application"
        subMessage="Preparing your experience..."
      />
    );
  }

  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
    }}>
      <h1>Application Loaded!</h1>
      <p>The loader will show again on page refresh.</p>
      <button 
        onClick={() => setIsLoading(true)}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          background: 'linear-gradient(135deg, #0071E3 0%, #34C759 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: 600
        }}
      >
        Show Loader Again
      </button>
    </div>
  );
};

export default LoaderExample;


/**
 * ====================================
 * HOW TO USE IN YOUR APP:
 * ====================================
 * 
 * 1. IN APP ROOT (App.tsx or similar):
 * 
 * import CustomLoader from '@/components/ui/CustomLoader';
 * 
 * function App() {
 *   const [isLoading, setIsLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     // Initialize your app
 *     initializeApp().then(() => {
 *       setIsLoading(false);
 *     });
 *   }, []);
 * 
 *   if (isLoading) {
 *     return <CustomLoader message="Loading" subMessage="Please wait..." />;
 *   }
 * 
 *   return <YourAppContent />;
 * }
 * 
 * ====================================
 * 
 * 2. FOR ROUTE TRANSITIONS:
 * 
 * import { useNavigate } from 'react-router-dom';
 * 
 * function MyComponent() {
 *   const [isLoading, setIsLoading] = useState(false);
 *   const navigate = useNavigate();
 * 
 *   const handleNavigate = async () => {
 *     setIsLoading(true);
 *     await fetchData();
 *     navigate('/new-page');
 *     setIsLoading(false);
 *   };
 * 
 *   return (
 *     <>
 *       {isLoading && <CustomLoader message="Loading Page" />}
 *       <button onClick={handleNavigate}>Go to Page</button>
 *     </>
 *   );
 * }
 * 
 * ====================================
 * 
 * 3. FOR ASYNC OPERATIONS:
 * 
 * function DataFetcher() {
 *   const [isLoading, setIsLoading] = useState(false);
 *   const [data, setData] = useState(null);
 * 
 *   const loadData = async () => {
 *     setIsLoading(true);
 *     const result = await api.fetchData();
 *     setData(result);
 *     setIsLoading(false);
 *   };
 * 
 *   return (
 *     <>
 *       {isLoading && (
 *         <CustomLoader 
 *           message="Fetching Data" 
 *           subMessage="This won't take long..."
 *         />
 *       )}
 *       {data && <DataDisplay data={data} />}
 *     </>
 *   );
 * }
 * 
 * ====================================
 * 
 * CUSTOMIZATION:
 * 
 * <CustomLoader 
 *   message="Custom Message"      // Main text
 *   subMessage="Custom Subtitle"   // Subtitle text
 * />
 * 
 * DEFAULT VALUES:
 * - message: "Loading"
 * - subMessage: "Please wait..."
 */

