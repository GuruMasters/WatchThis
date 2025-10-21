import * as functions from 'firebase-functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const possiblePaths = [
      path.join(process.cwd(), 'watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json'),
      path.join(process.cwd(), '..', 'watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json'),
      path.join(__dirname, '..', '..', 'watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json'),
    ];

    let serviceAccountPath: string | null = null;
    const fs = require('fs');

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        serviceAccountPath = p;
        break;
      }
    }

    if (serviceAccountPath) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        projectId: 'watchthis-b1602',
      });
      console.log('🔥 Firebase Admin SDK initialized successfully');
    } else {
      console.warn('⚠️  Firebase service account file not found. Running in mock mode.');
    }
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
  }
}

const server = express();

export const api = functions.https.onRequest(async (req, res) => {
  // Create NestJS app with Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Enable CORS
  const allowedOrigins: string[] = [
    'http://localhost:3000',
    'http://localhost:4088',
    'http://localhost:5321',
    'https://watchthis-b1602.web.app',
    'https://watchthis-b1602.firebaseapp.com',
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_PROD,
  ].filter((origin): origin is string => Boolean(origin));

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  await app.init();
  server(req, res);
});
