/// <reference types="node" />
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// Only import Firebase Admin SDK on server-side (Node.js environment)
let admin: any = null;
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  // We're in a Node.js environment (backend)
  admin = require('firebase-admin');
} else {
  // Create a mock admin object for frontend to avoid errors
  admin = {
    apps: [],
    initializeApp: () => ({}),
    credential: { cert: () => ({}) },
    firestore: { FieldValue: {} },
    ServiceAccount: {}
  } as any;
}

// Firebase configuration from environment variables
// Note: import.meta.env is only available in Vite/bundler environments
// For shared libraries, we use conditional environment access
const getEnvVar = (keys: string[]) => {
  if (typeof process !== 'undefined' && process.env) {
    // Server-side or Node.js environment
    for (const key of keys) {
      if (process.env[key]) {
        return process.env[key];
      }
    }
  } else if (typeof window !== 'undefined') {
    // Client-side - try different ways to get environment variables
    for (const key of keys) {
      // Try Vite's import.meta.env (if available) - only in frontend/Vite environments
      // Since we use Vite's 'define' option, this should primarily use process.env
      // But we keep this as a fallback for Vite's built-in environment variables
      // Try window.ENV (injected by Vite)
      if ((window as any).ENV && (window as any).ENV[key]) {
        return (window as any).ENV[key];
      }
    }
  }
  return undefined;
};

const firebaseConfig = {
  apiKey: getEnvVar(['VITE_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_API_KEY', 'FIREBASE_API_KEY']),
  authDomain: getEnvVar(['VITE_FIREBASE_AUTH_DOMAIN', 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'FIREBASE_AUTH_DOMAIN']),
  projectId: getEnvVar(['VITE_FIREBASE_PROJECT_ID', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'FIREBASE_PROJECT_ID']),
  storageBucket: getEnvVar(['VITE_FIREBASE_STORAGE_BUCKET', 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'FIREBASE_STORAGE_BUCKET']),
  messagingSenderId: getEnvVar(['VITE_FIREBASE_MESSAGING_SENDER_ID', 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_MESSAGING_SENDER_ID']),
  appId: getEnvVar(['VITE_FIREBASE_APP_ID', 'NEXT_PUBLIC_FIREBASE_APP_ID', 'FIREBASE_APP_ID']),
  measurementId: getEnvVar(['VITE_FIREBASE_MEASUREMENT_ID', 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', 'FIREBASE_MEASUREMENT_ID']),
};

// Validate required configuration - handle gracefully
const requiredFields = ['apiKey', 'authDomain', 'projectId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

// Check if configuration looks like demo/dummy values
const isDemoConfig = firebaseConfig.apiKey === 'demo-api-key' ||
                    firebaseConfig.apiKey === 'AIzaSyDUMMY_KEY_FOR_DEVELOPMENT' ||
                    firebaseConfig.projectId === 'demo-project' ||
                    firebaseConfig.projectId === 'consultation-pro';


if (missingFields.length > 0) {
  console.warn(`Missing Firebase configuration fields: ${missingFields.join(', ')}`);
  console.warn('Please update your .env file with actual Firebase project values.');
  console.warn('Get these values from: https://console.firebase.google.com/');
} else if (isDemoConfig) {
  console.warn('⚠️  Using demo Firebase configuration. Firebase services will be disabled.');
  console.warn('Please replace the values in consultation-frontend/.env with your actual Firebase project configuration.');
  console.warn('You can find these values in your Firebase Console -> Project Settings -> General');
}

// Initialize Firebase only if configuration is valid and not demo
let app: any = null;
let auth: any = null;
let db: any = null;
let functions: any = null;
let storage: any = null;

if (missingFields.length === 0 && !isDemoConfig) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    functions = getFunctions(app);
    storage = getStorage(app);
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
  }
} else {
  console.warn('🔶 Firebase initialization skipped - configuration invalid or demo mode');
  console.warn('Please update your .env file with actual Firebase project values.');
}

export { auth, db, functions, storage };

export default app;

// Export configuration for debugging
export { firebaseConfig };

// Firebase Admin SDK configuration for server-side operations
let firebaseAdmin: any = null;
let adminAuth: any = null;
let adminFirestore: any = null;
let adminStorage: any = null;

if (admin && typeof process !== 'undefined' && process.versions && process.versions.node && admin.initializeApp) {
  // Only initialize Firebase Admin SDK on server-side with real admin SDK
  const initializeFirebaseAdmin = () => {
    // Only initialize if not already initialized
    if (!admin.apps.length) {
      const serviceAccount = {
        type: 'service_account',
        project_id: getEnvVar(['FIREBASE_ADMIN_PROJECT_ID']) || 'watchthis-b1602',
        private_key_id: getEnvVar(['FIREBASE_ADMIN_PRIVATE_KEY_ID']),
        private_key: getEnvVar(['FIREBASE_ADMIN_PRIVATE_KEY'])?.replace(/\\n/g, '\n'),
        client_email: getEnvVar(['FIREBASE_ADMIN_CLIENT_EMAIL']) || 'firebase-adminsdk-fbsvc@watchthis-b1602.iam.gserviceaccount.com',
        client_id: getEnvVar(['FIREBASE_ADMIN_CLIENT_ID']),
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: getEnvVar(['FIREBASE_ADMIN_CLIENT_X509_CERT_URL']),
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
        projectId: getEnvVar(['FIREBASE_ADMIN_PROJECT_ID']) || 'watchthis-b1602',
      });
    }

    return admin;
  };

  // Initialize Firebase Admin SDK only on server-side
  firebaseAdmin = initializeFirebaseAdmin();
  adminAuth = firebaseAdmin.auth();
  adminFirestore = firebaseAdmin.firestore();
  adminStorage = firebaseAdmin.storage();
} else {
  // Set mock values for frontend
  firebaseAdmin = admin;
  adminAuth = null;
  adminFirestore = null;
  adminStorage = null;
}

// Export with fallback values for frontend
export { firebaseAdmin, adminAuth, adminFirestore, adminStorage };
