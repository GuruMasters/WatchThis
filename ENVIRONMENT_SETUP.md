# Environment Setup Guide

This project uses Firebase and various other services that require environment variables for configuration.

## Environment Files Structure

The project uses multiple `.env` files for different parts of the application:

- **Root `.env`** - Main configuration shared across all apps
- **`consultation-frontend/.env`** - Frontend-specific configuration (Vite)
- **`consultation-backend/.env`** - Backend-specific configuration (NestJS)
- **`consultation-mobile/.env`** - Mobile app configuration (React Native)

## Firebase Configuration

Copy the provided Firebase configuration to all `.env` files:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCKTBtDm-fOY6638FwnYOVX79u-2FuJsKw
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=watchthis-b1602.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=watchthis-b1602
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=watchthis-b1602.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=767951322169
NEXT_PUBLIC_FIREBASE_APP_ID=1:767951322169:web:b417a7ed7e9e8a5ffbe1e8
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-P5L5QPZRFE
```

### Frontend Specific (Vite)
For the frontend, use `VITE_` prefix:

```env
VITE_FIREBASE_API_KEY=AIzaSyCKTBtDm-fOY6638FwnYOVX79u-2FuJsKw
VITE_FIREBASE_AUTH_DOMAIN=watchthis-b1602.firebaseapp.com
# ... other Firebase configs with VITE_ prefix
```

### Backend Specific
For the backend, include Firebase Admin SDK configuration:

```env
# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=watchthis-b1602
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-fbsvc@watchthis-b1602.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY_ID=93cbf249137e9acd3112e5c08c2e43aaca8034a7
FIREBASE_ADMIN_CLIENT_ID=113208135881994083451
FIREBASE_ADMIN_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40watchthis-b1602.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n[YOUR_PRIVATE_KEY]\n-----END PRIVATE KEY-----
```

## Email Configuration

If you plan to use EmailJS for email notifications, configure these variables:

```env
EMAILJS_SERVICE_ID=your-emailjs-service-id
EMAILJS_TEMPLATE_ID=your-emailjs-template-id
EMAILJS_PUBLIC_KEY=your-emailjs-public-key
```

## Application Configuration

```env
# Application Configuration
APP_NAME=Consultation Booking
APP_URL=http://localhost:4088

# Backend Configuration
PORT=3088
NODE_ENV=development
CORS_ORIGIN=http://localhost:4088

# Mobile App Configuration
APP_NAME=Consultation Booking Mobile
APP_ENV=development
```

## Setup Steps

1. **Copy environment files:**
   ```bash
   cp .env.example .env
   cp consultation-frontend/.env.example consultation-frontend/.env
   cp consultation-backend/.env.example consultation-backend/.env
   cp consultation-mobile/.env.example consultation-mobile/.env
   ```

2. **Update Firebase configuration** in all `.env` files with your actual Firebase project settings

3. **Configure Firebase Admin SDK** in `consultation-backend/.env` with your service account credentials

4. **Install dependencies:**
   ```bash
   yarn install
   ```

5. **Start the applications:**
   ```bash
   # Frontend
   yarn nx serve consultation-frontend
   
   # Backend
   yarn nx serve consultation-backend
   ```

## Security Notes

- **Never commit `.env` files** to version control
- **Use different Firebase projects** for development, staging, and production
- **Rotate service account keys** regularly in production
- **Use environment-specific configurations** for different deployment stages

## Firebase Admin SDK Setup

For the backend to work with Firebase Admin SDK:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Generate a new private key
5. Use the downloaded JSON file to populate the `FIREBASE_ADMIN_*` environment variables

The Firebase Admin SDK allows server-side operations like:
- User management
- Firestore operations with full permissions
- Storage operations
- Authentication token verification
